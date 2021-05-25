import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FoodtrucksService } from '../../foodtrucks.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  located: boolean;
  showfood: boolean;
  foodtrucks: any[];
  foodtrucksClean: any[];
  address1: string;
  options: any;

  constructor(private foodtrucksService: FoodtrucksService) {
    this.lat = 37.75;
    this.lng = -122.48;
    this.zoom = 9;
    this.mapTypeId = 'hybrid';
    this.located = false;
    this.showfood = false;
    this.foodtrucks = [];
    this.foodtrucksClean = [];
    this.address1 = 'address1';
  }

  @ViewChild('placesRef')
  placesRef!: GooglePlaceDirective;

  ngOnInit(): void {
  }

  public handleAddressChange(address: Address) {
    console.log('Latitud');
    console.log(address.geometry.viewport.getCenter().lat());
    console.log('Longitud');
    console.log(address.geometry.viewport.getCenter().lng());
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = address.geometry.viewport.getCenter().lat();
      this.lng = address.geometry.viewport.getCenter().lng();
      this.zoom = 18;
      this.located = true;
    });
    this.foodtrucksService.getAll()
    .then(foodtrucks => this.foodtrucks = foodtrucks)
    .catch(error => console.log(error));

    this.showfood = true;
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.zoom = 17;
      this.located = true;
    });
  }


  showFoodtrucksInfo() {
    this.foodtrucksService.getAll()
    .then(foodtrucks => this.foodtrucks = foodtrucks)
    .catch(error => console.log(error));

    this.showfood = true;
    this.lat = 37.75;
    this.lng = -122.48;
    this.zoom = 10;


  }

}









