import { Mesaurement } from './../../../../models/Measurement';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from './../../../../models/Category';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  ingredientForm;
  ingredient;
  name: string;
  imageUrl: string;
  density: Number;
  id:string;
  checkId:string;
  measurementArray: Mesaurement[];
  getMeasurementArray: string[] = [];
  categoryArray: Category[];
  getCategoryArray: string[] = [];
  modifiedText1:string;
  modifiedText2:string;
  constructor(private formBuilder: FormBuilder,
    private adminDataService: AdminDataService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      route.params.subscribe(val => {
        this.id = val._id;
        console.log(this.id);
      });
      this.ingredientForm = formBuilder.group({
      name: '',
      image: '',
      density: ''
    });
    
  }


  ngOnInit(): void {
    this.adminDataService.getMeasurements().subscribe(
      response => {
        this.measurementArray = response;
        //this.checkId = this.measurementArray.measurementId;
        console.log(this.measurementArray);
      }
    )

    this.adminDataService.getCategories().subscribe(
      response => {
        this.categoryArray = response;
        console.log(this.categoryArray);
      }
    )
  }


  onIngredientSubmit(ingredientData) {
    this.ingredient = {
      name: ingredientData.name,
      image: ingredientData.image,
      density: ingredientData.density
    };
    console.log(this.ingredient);
    this.ingredientForm.reset();
    this.adminDataService.addIngredient(this.ingredient);
    this.router.navigateByUrl('/add-ingredient');
  }

  onEmployeeSelected1(event:any){
    console.log("called 1");
    //this.modifiedText = val;
    this.modifiedText1 = event.target.value;
    console.log(this.modifiedText1);
    this.getCategoryArray.push(this.modifiedText1); 
  }

  
  onEmployeeSelected2(event:any){
    console.log("called 2");
    //this.modifiedText = val;
    this.modifiedText2 = event.target.value;
    console.log(this.modifiedText2);
    this.getMeasurementArray.push(this.modifiedText2); 

  }


}