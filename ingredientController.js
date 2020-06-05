
const express = require('express');
const BodyParser = require("body-parser");
var router = express.Router();
var NutritionProfile = require('../Models/nutritionProfile')
var Measurement=require('../Models/measurement')
var Ingredient=require('../Models/ingredient');
var Category=require('../Models/category');
router.use(BodyParser.json());
router.use(BodyParser.urlencoded({ extended: true }));

router.get('/categories', isLoggedIn, (req, res) => {
   
    Category.find().populate().exec((err, categories) => {
        if (err) {
            console.log("Unable to retrieve Categories");
        } else {
            res.send(categories);
        }
    });
});

router.post("/new", isLoggedIn, async (request, response) => {
    try {
        var ingredient = new Ingredient({
            ingredientId:request.body.name+"#",
            name: request.body.name,
            image: request.body.image,
            density: request.body.density,
            nutritionProfileId:request.body.name+"#np#"
            })
        var result = await ingredient.save();
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

router.post("/nutritionProfiles/new",isLoggedIn ,async(req,res)=>{
    
    try{
    var nutritionProfile = new NutritionProfile( {
      ingredientId:req.body.ingredientId+"#",
      nutritionProfileId:req.body.ingredientId+"#np#" ,
      fatContent : req.body.fatContent,
      proteinContent:req.body.proteinContent,
      carbohydrateContent : req.body.carbohydrateContent,
      vitaminName:req.body.vitaminName,
      vitaminContent:req.body.vitaminContent
    })
    var result = await nutritionProfile.save();
    console.log("successfully saved nutrition profile")
    
    }
    catch(error){
        console.log("error"+error);
        res.status(500).send(error);
    }
})

//not required

// router.post("/category/new", isLoggedIn, async (request, response) => {
//     //var name; var image; var density;
//     console.log("ela unav",request.body.name);
//     try {
//         var ingredientCat = new Category({
//             name: request.body.name
//         })
        
//         var result = await ingredientCat.save();
//     }
//     catch (error) {
//         console.log("hiiiii",error);
//         response.status(500).send(error);
//     }
// });


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.send("No logged in user!!");
    }
}

module.exports = router;