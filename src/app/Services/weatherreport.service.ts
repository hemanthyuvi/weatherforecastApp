import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {forkJoin} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WeatherreportService {
  domainlink = "http://api.openweathermap.org/data/2.5/";
  constructor(
    private _http: HttpClient
  ) { }

  citiesWeatherData(cities):Observable<any[]>{ 
    let city1 = this._http.get(this.domainlink+"weather?q="+cities[0]+"&appid=3d8b309701a13f65b660fa2c64cdc517");
    let city2 = this._http.get(this.domainlink+"weather?q="+cities[1]+"&appid=3d8b309701a13f65b660fa2c64cdc517");
    let city3 = this._http.get(this.domainlink+"weather?q="+cities[2]+"&appid=3d8b309701a13f65b660fa2c64cdc517");
    let city4 = this._http.get(this.domainlink+"weather?q="+cities[3]+"&appid=3d8b309701a13f65b660fa2c64cdc517");
    let city5 = this._http.get(this.domainlink+"weather?q="+cities[4]+"&appid=3d8b309701a13f65b660fa2c64cdc517");
    let allCities = [city1,city2,city3,city4,city5];
    return forkJoin(allCities);
  }

  getWeatherData(cityname:string):Observable<any>{ 
    return this._http.get<any[]>(this.domainlink+"forecast?q="+cityname+"&appid=3d8b309701a13f65b660fa2c64cdc517")
                      .pipe(catchError(this.handleError<any>("error found")));              
  }

  handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return throwError(error.message || "server error");
    };
  }

}
