import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {WeatherreportService} from '../Services/weatherreport.service';
import {  MessageService } from "primeng/api";
import {dailyReport} from '../Services/models';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  cityname: string;
  dailyData: any[] = [];
  dailyWeatherReport: dailyReport[] = [];
  constructor(
    private _route: Router,
    private _paramroute:ActivatedRoute,
    private _postData : WeatherreportService,
    private _messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // reading the city name from the URL using routing.
    this._paramroute.paramMap.subscribe(params => {
      this.cityname = params.get("city");
     });

     this.getNextFiveDaysData();
  }

  getNextFiveDaysData(){
    var getDayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    this._postData.getWeatherData(this.cityname).subscribe(data => {
      this.seperateDailyData(data);
      this.dailyData.forEach(value => {
        const dateTime = new Date(value.dt_txt);
        const day = dateTime.getDay();
        let weekday = getDayNames[day];
          this.dailyWeatherReport.push({
            weekday:weekday,
            temperature:value.main["temp"],
            sealevel:value.main["sea_level"]
          });
      });
    },(error) => {
      this._messageService.add({key: 'error', severity:'error', summary: 'Failed', detail: error});
    })
  }

  // This function will filter data based on the time(9:00) and stores in the dailyData array. 
  seperateDailyData(weatherData){
    weatherData.list.map(item => {
       const dateTime = new Date(item.dt_txt);
       const time = dateTime.getHours();
       if(time == 9){
          this.dailyData.push(item);
       }   
    });
  }

}
