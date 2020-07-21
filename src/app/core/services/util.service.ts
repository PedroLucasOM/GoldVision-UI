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
}
