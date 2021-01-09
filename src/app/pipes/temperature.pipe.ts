import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number): string {
    if(!value){
      return null
    }
    // else return value
    else return Math.round(value - 273.15) + `*`
  }

}
