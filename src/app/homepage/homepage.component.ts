import { Component, OnInit } from '@angular/core';
import { WeatherDetails} from '../Services/models';
import {WeatherreportService} from '../Services/weatherreport.service';
import { MessageService } from "primeng/api";
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  countriesData: WeatherDetails[] = [];
  europeCities = ["London","Paris", "Rome", "New York", "Berlin"];
  constructor(
    private _report : WeatherreportService,
    private _messageService : MessageService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.getWeatherCitiesData();
  }

  // On below we subscibe to the citiesWeatherData observable by passing citynames to get weather forecast data.
  getWeatherCitiesData(){
    this._report.citiesWeatherData(this.europeCities).subscribe(data => {
      data.forEach(value => {
        let sunriseDate = new Date(value.sys["sunrise"]);
        let sunsetDate = new Date(value.sys["sunset"]);
        this.countriesData.push({
            name:value.name,
            temperature:value.main["temp"],
            sunrise:sunriseDate,
            sunset: sunsetDate,
        });
      }); 
    },(error) => {
      this._messageService.add({key: 'error', severity:'error', summary: 'Failed', detail: error});
    })
  }

  // This function will redirect the user to details page.
  nextFiveDaysReport(citiname:string){
    this._route.navigate(['details', citiname]);
  }

}
