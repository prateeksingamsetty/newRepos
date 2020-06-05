import { Category } from './../models/Category';
import { Mesaurement } from './../models/Measurement';
import { NutritionProfile } from './../models/NutritionProfile';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ingredient} from '../models/Ingredient'
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})


export class AdminDataService {
  
 
  
  SERVER_URI = 'http://localhost:3000/'
  constructor(private http: HttpClient) {
    // this.channel = new Channel();
    // this.channel.name = "Akarsh";
    // this.channel.recipes = [];
  }
 
  addIngredient(ingredient){
    var URL = "http://localhost:3000/ingredients/new";
    console.log("sending this  " + ingredient);
    var response = this.http.post<Ingredient>(URL,
      ingredient, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
      ).subscribe(data => {
        console.log(data);
      });
      return response;
  }
 
  addnp(nutritionProfile) {
    console.log("received data"+nutritionProfile.ingredientId)
    var URL ="http://localhost:3000/ingredients/nutritionProfiles/new";
    var response = this.http.post<NutritionProfile>(URL,nutritionProfile,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')

    }).subscribe(data=>{
    console.log(data)
    })
    return response;
  }
  addMeasurement(mesData: any) {
    console.log("received data"+mesData.measurementId)
    var URL ="http://localhost:3000/measurements/new";
    var response = this.http.post<Mesaurement>(URL,mesData,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')

    }).subscribe(data=>{
    console.log(data)
    })
    return response;
  }

  addIngredientCat(ingredientCat){
    var URL = "http://localhost:3000/ingredients/category/new";
    var response = this.http.post<Ingredient>(URL,
      ingredientCat, {
        observe: 'body',
        withCredentials: true,
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
      ).subscribe(data => {
        console.log(data);
      });
      return response;
  }

  getMeasurementbyId(id): Observable<Mesaurement> {
    console.log("Recieved get measurement with : " + id);
    var URL = "http://localhost:3000/measurements/:" + id;
    return this.http.get<Mesaurement>(URL, { withCredentials: true });
  }

 

  getMeasurements(): Observable<Mesaurement[]> {
    var URL = "http://localhost:3000/measurements";
    var measurements;
    measurements = this.http.get<Mesaurement[]>(URL, { withCredentials: true })
    // console.log(response);
    return measurements;
  }

  getCategories(): Observable<Category[]> {
    var URL = "http://localhost:3000/ingredients/categories";
    var categories;
    categories = this.http.get<Category[]>(URL, { withCredentials: true })
    // console.log(response);
    return categories;
  }

  
  ngOnDestroy() { console.log("dying"); }

}
