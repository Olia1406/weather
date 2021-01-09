import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WservService {
  private url:string;
  private cityUrl:string;
  constructor(private http:HttpClient) { 
    // this.url = 'https://api.openweathermap.org/data/2.5/weather?APPID=884d81e08928897eb9732f0ffb3a3dbd&q=London'
    this.url = `https://api.openweathermap.org/data/2.5/onecall?lat=49.884794199999995&lon=23.4627826&appid=884d81e08928897eb9732f0ffb3a3dbd`
    this.cityUrl = 'https://geocode.xyz/41.3189957000,2.0746469000?json=1&auth=290629103372115107625x125300'
  
  }

  getWeatherData(lat,lon): Observable<any> {
    return  this.http.get<any>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=884d81e08928897eb9732f0ffb3a3dbd`)
  }
  getCityData(lat,lon): Observable<any> {
    return  this.http.get<any>(`https://geocode.xyz/${lat},${lon}?json=1&auth=290629103372115107625x125300`)
  }


}
