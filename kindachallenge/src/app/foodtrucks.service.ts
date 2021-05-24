import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodtrucksService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://data.sfgov.org/resource/rqzj-sfat.json';
   }

   // Acá puedo poner hacer un modelo para lo que viene en el json
   getAll(): Promise<any[]>{
     return this.httpClient.get<any[]>(this.baseUrl).toPromise();
   }

}
