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
  europeCountries = ["London","Paris", "Rome", "New York", "Berlin"];
  constructor(
    private _report : WeatherreportService,
    private _messageService : MessageService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.getWeatherCitiesData();
  }

  getWeatherCitiesData(){
    this._report.citiesWeatherData(this.europeCountries).subscribe(data => {
      data.forEach(value => {
        let sunriseDate = new Date(value.sys["sunrise"]);
        let sunsetDate = new Date(value.sys["sunset"]);
        console.log(sunriseDate);
        console.log(sunsetDate);
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

  nextFiveDaysReport(citiname:string){
    this._route.navigate(['details', citiname]);
  }

}
