import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map, publishReplay, refCount, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WservService {
  constructor(private http: HttpClient) { }

  private cacheWeather: Observable<any>;
  private cacheCity: Observable<any>;
  private cacheCoords: Observable<any>;
  private lats: Array<number> = [];
  private lons: Array<number> = [];
  private cityList: Array<string> = [];
  private weatherReqChecker: boolean;
  private cityChecker: boolean;

  getWeatherData(lat, lon): Observable<any> {  
    // for (let i = 0; i < this.lats.length; i++) {
    //   if (this.lats[i] == lat && this.lons[i] == lon) {
    //     this.weatherReqChecker = true
    //   }
    //   else this.weatherReqChecker = false
    // }
    // if (!this.cacheWeather || !this.weatherReqChecker) {
    //   this.cacheWeather = this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=884d81e08928897eb9732f0ffb3a3dbd`).pipe(
    //     publishReplay(1),
    //     refCount()
    //   );

    // }
    // this.lats.push(lat);
    // this.lons.push(lon);
    // return this.cacheWeather
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=884d81e08928897eb9732f0ffb3a3dbd`)

  }

  getCityNameByCoords(lat, lon): Observable<any> {
    // for (let i = 0; i < this.lats.length; i++) {
    //   if (this.lats[i] == lat && this.lons[i] == lon) {
    //     this.weatherReqChecker = true
    //   }
    //   else this.weatherReqChecker = false
    // }
    // if (!this.cacheCity || !this.weatherReqChecker) {
    //   this.cacheCity = this.http.get(`https://geocode.xyz/${lat},${lon}?json=1&auth=290629103372115107625x125300`).pipe(
    //     publishReplay(1),
    //     refCount()
    //   );
    // }
    // this.lats.push(lat);
    // this.lons.push(lon);
    // return this.cacheCity;
    return  this.http.get<any>(`https://geocode.xyz/${lat},${lon}?json=1&auth=290629103372115107625x125300`)
    // return  this.http.get<any>(`https://geocode.xyz/${lat},${lon}?json=1&auth=133849505315998109630x92178`)
  }

  getLocationDataByCity(city): Observable<any> {
    // for (let i = 0; i < this.cityList.length; i++) {
    //   if (this.cityList[i] == city) {
    //     this.cityChecker = true
    //   }
    //   else this.cityChecker = false
    // }
    //   if (!this.cacheCoords || !this.cityChecker) {
    //     this.cacheCoords = this.http.get(`https://geocode.xyz/?json=1&locate=${city}&auth=290629103372115107625x125300`).pipe(
    //         publishReplay(1),
    //         refCount()
    //     );
    // }
    // this.cityList.push(city);
    // return this.cacheCoords;
    return this.http.get<any>(`https://geocode.xyz/?json=1&locate=${city}&auth=290629103372115107625x125300`)
    // return this.http.get<any>(`https://geocode.xyz/?json=1&locate=${city}&auth=133849505315998109630x92178`)
  }

}
