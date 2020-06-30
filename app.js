const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set("view engine","ejs");

//MONGO URI
const mongoURI = 'mongodb+srv://prateek:prateek@cluster0-b8wzi.mongodb.net/test';

//Create mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;

conn.once('open',function(){
    //Init stream
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');

   
})

 //Create storage engine

  
 const storage = new GridFsStorage({
   url: mongoURI,
   file: (req, file) => {
     return new Promise((resolve, reject) => {
       crypto.randomBytes(16, (err, buf) => {
         if (err) {
           return reject(err);
         }
         const filename = buf.toString('hex') + path.extname(file.originalname);
         const fileInfo = {
           filename: filename,
           bucketName: 'uploads'
         };
         resolve(fileInfo);
       });
     });
   }
 });
 const upload = multer({ storage });


//GET
app.get('/',function(req,res){
    res.render("index");
});

//POST uploads
app.post('/uploads',upload.single('file'),function(req,res){
    res.redirect('/');
})

//Get req to display all files in db as json
app.get('/files',function(req,res){
    gfs.files.find().toArray((err,files) =>{
        if(!files || files.length === 0){
            err : 'No files exist'
        }
        //if no error return
        return res.json(files);
    })
})

//Get a single file
app.get('/files/:filename',function(req,res){
    gfs.files.findOne({filename : req.params.filename},(err,file) => {
        if(!file || file.length === 0){
            err : 'No file exist'
        }
        //if no error return
        return res.json(file);
    })
})

//Get a video file
app.get('/image/:filename',function(req,res){
    gfs.files.findOne({filename : req.params.filename},(err,file) => {
        if(!file || file.length === 0){
            err : 'No file exist'
        }
        //if no error return
        if(file.contentType === 'image/png' || file.contentType === 'image/jpeg'){
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }else{
            res.status(404).json({
                err:'Not an image'
            })
        }
    })
})

app.listen(3000,function(req,res){
    console.log("server listening");
})