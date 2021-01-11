import { Component, OnInit } from '@angular/core';
import { WservService } from '../service/wserv.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  lat: number;
  lon: number;
  currentCity: string;
  currentCityStatic: string;
  initiasCoordsData: any;
  weatherData: any;
  geoApiCalls = 1;
  constructor(private wServ: WservService) { }

  ngOnInit(): void {
    this.findCoords();
  }
// get weather data and city name using local coords
  findCoords():void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        let key: string = this.lat.toString() + this.lon.toString();
        // if (localStorage.getItem(`${key}`)) {
        //   this.initiasCoordsData = JSON.parse(localStorage.getItem(`${key}`))
        //   this.currentCity = this.initiasCoordsData.city
        //   this.currentCityStatic = this.initiasCoordsData.city
        //   console.log('City data', this.initiasCoordsData)
        // }
        // else {
        // get weather data
        this.getWeatherData(this.lat, this.lon);
        // and get city name at the same time
        this.wServ.getCityNameByCoords(this.lat, this.lon).subscribe(d => {
          this.currentCity = d.city
          this.currentCityStatic = d.city
          // localStorage.setItem(`${key}`, JSON.stringify(d))
          setTimeout(() => {
            localStorage.removeItem(`${key}`)
          }, 60000)
          this.geoApiCalls = d.remaining_credits
          console.log('Geoloation API calls', this.geoApiCalls)
          console.log('City data', d)
        })
        // }
      })
    }
    else console.log('does not supports')
  }
// get weather data by another city name (currentCity, - changable)
// uses getWeatherData(), described below
  getNewCityWeather() {
    let keyName = this.currentCity.toLowerCase()
    if (localStorage.getItem(`${keyName}`)) {
      let d = JSON.parse(localStorage.getItem(`${keyName}`))
      this.currentCityStatic = d.standard.city
      console.log('Location data', d)
      this.lat = d.latt
      this.lon = d.longt
      this.getWeatherData(this.lat, this.lon)
    }
    else {
      this.wServ.getLocationDataByCity(this.currentCity).subscribe(d => {
        this.currentCityStatic = d.standard.city
        this.lat = d.latt
        this.lon = d.longt
        this.getWeatherData(this.lat, this.lon)
        localStorage.setItem(`${keyName}`, JSON.stringify(d))
        setTimeout(() => {
          localStorage.removeItem(`${keyName}`)
        }, 60000)
        this.geoApiCalls =  d.remaining_credits
        console.log('Geoloation API calls', this.geoApiCalls)
        console.log('Location data', d)
      })
    }


  }

  getWeatherData(lat: number, lon: number): void {
    let k: string = lat.toString() + lon.toString();
    if (localStorage.getItem(`${k}`)) {
      this.weatherData = JSON.parse(localStorage.getItem(`${k}`))
    }
    else {
      this.wServ.getWeatherData(lat, lon)
        .subscribe(d => {
          this.weatherData = d;
          localStorage.setItem(`${k}`, JSON.stringify(this.weatherData))
          setTimeout(() => {
            localStorage.removeItem(`${k}`)
          }, 60000)
          console.log('Weather data', this.weatherData)
        },
          error => { console.log('error', error); alert('There is no such city') }
        )
    }

  }

  clear() {
    this.currentCity = '';
  }

  readableDate(time) {
    let d = new Date(time * 1000);
    let dd = d.getDate();
    let mm = +d.getMonth() + 1;
    if (dd >= 0 && dd < 10) {
      return "0" + dd + "." + mm
    }
    else if (mm >= 0 && mm < 10) {
      return dd + "." + "0" + mm
    }
    else return dd + "." + mm
  }


}
