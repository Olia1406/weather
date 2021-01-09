import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WservService {
  constructor(private http:HttpClient) { }

  getWeatherData(lat,lon): Observable<any> {
    return  this.http.get<any>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=884d81e08928897eb9732f0ffb3a3dbd`)
  }

  getCityNameByCoords(lat,lon): Observable<any> {
    return  this.http.get<any>(`https://geocode.xyz/${lat},${lon}?json=1&auth=290629103372115107625x125300`)
  }

  getLocationDataByCity(city): Observable<any>{
    return this.http.get<any>(`https://geocode.xyz/?json=1&locate=${city}&auth=290629103372115107625x125300`)
  }

}
