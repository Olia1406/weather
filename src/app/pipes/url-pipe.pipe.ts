import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlPipe'
})
export class UrlPipePipe implements PipeTransform {

  transform(value: any): string {
    if (!value) {
    // return 'http://openweathermap.org/img/wn/10d@2x.png'
    return null
    }
    else return 'http://openweathermap.org/img/wn/' + value + '@2x.png'


  }


}
