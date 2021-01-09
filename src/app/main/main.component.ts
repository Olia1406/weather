import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { WservService } from '../service/wserv.service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  lat: number;
  lon: number;
  currentCity: string;
  weatherData: any;
  displayBlock = true;
  iterations = [0, 1, 2, 3, 4]
  constructor(private wServ: WservService) { }

  ngOnInit(): void {
    this.findCoords()
  }

  findCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.wServ.getCityNameByCoords(this.lat, this.lon).subscribe(d => {
          this.currentCity = d.city
          console.log('City data', d)
        }
        )
        this.getWeatherData(this.lat, this.lon);
      })
    }
    else console.log('does not supports')
  }

  getNewCityWeather() {
    // console.log(this.currentCity)

    this.wServ.getLocationDataByCity(this.currentCity).subscribe(d => {
      this.currentCity = d.standard.city
      console.log('Location data', d)
      this.lat = d.latt
      this.lon = d.longt
      this.getWeatherData(this.lat, this.lon)
    })
  }


  getWeatherData(lat, lon) {
    this.displayBlock = false;
    this.wServ.getWeatherData(lat, lon)
      // .pipe(catchError(err=>{  
      //     alert('There is no such city')
      //                 console.log('ghghghf',err); 
      //                 return throwError(err);
      //             })
      // )
      .subscribe(d => {
        this.weatherData = d;
        this.displayBlock = true;
        console.log('Weather data', this.weatherData)
      },
        error => { console.log('jgjh', error); alert('There is no such city') }
      )
    // catchError(err => {  
    //   alert('There is no such city')
    //               console.log('ghghghf',err); 
    //               return throwError(err);
    //           })

  }

  clear() {
    this.currentCity = '';
    this.displayBlock = false;
  }

  getDay() {

  }

  readableDate(time) {
    var d = new Date(time*1000);
    let dd = d.getDate();
    let mm = +d.getMonth() + 1;
    let yy = d.getFullYear();
    let hh = d.getHours();
    let mmn = d.getMinutes();
    if (dd >= 0 && dd < 10) {
      // return dd + "/" + mm + "/" + yy + " " + hh + ":0" + mmn;
      return "0" + dd + "." + mm
    }
    else if (mm >= 0 && mm < 10) {
      // return dd + "/" + mm + "/" + yy + " " + hh + ":" + mmn;
      return dd + "." +"0" + mm
    }
    else return dd + "." + mm

  }


}
