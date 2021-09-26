import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() {
  }

  onFormatDate(date: Date | string) {
    return moment(date).format('DD/MM/YYYY');
  }

  colorGenerator(size: number) {
    const colorArray = [];
    for (let i = 0; i < size; i++) {
      let color = '#';
      while (color.length < 7) {
        color += Math.floor(Math.random() * 0x10).toString(16);
      }
      colorArray.push(color);
    }
    return colorArray;
  }
}
