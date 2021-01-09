import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WservService } from '../service/wserv.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  url: string;
  lat: number = 55;
  lon: number = 66;
  currentCity$: Observable<string>;
  weatherData$: Observable<any>;
  imgUrl = '';
  constructor(private http: HttpClient, private wServ: WservService) {
    // this.url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&appid=884d81e08928897eb9732f0ffb3a3dbd`

  }

  ngOnInit(): void {
    this.findCoords()
  }

  findCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.currentCity$ = this.http.get<any>(`https://geocode.xyz/${this.lat},${this.lon}?json=1&auth=290629103372115107625x125300`)
        this.getCityData();
        // console.log(new Date().getTime())
      })
    }
    else console.log('does not supports')

  }

  getWeatherData() {
    this.weatherData$ = this.http.get<any>(this.url);
    this.wServ.getWeatherData(2,2).subscribe(d =>
      console.log('Weather data', d))
  }

  getCityData() {
    this.wServ.getCityData(2,2).subscribe(d => {
      console.log('City data', d)
      this.url = 'https://api.openweathermap.org/data/2.5/weather?q=London&APPID=884d81e08928897eb9732f0ffb3a3dbd'
      this.getWeatherData();
      }
    )
  }


}
