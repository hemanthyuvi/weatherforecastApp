import { Component, OnInit } from '@angular/core';
import {City} from '../Services/models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  cities: City[];

  selectedCity: City;

  constructor() { }

  ngOnInit(): void {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Berlin', code: 'BN'},
      {name: 'Paris', code: 'PRS'}
  ];
  console.log(this.selectedCity);
  }

}
