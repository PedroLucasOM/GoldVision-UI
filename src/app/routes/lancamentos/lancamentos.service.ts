import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  static lancamentosUrl = `${environment.ApiURL}/lancamentos`;

  constructor(private http: HttpClient) {
  }

  resumir(): Promise<any> {
    return this.http.get(`${LancamentosService.lancamentosUrl}?resumir`).toPromise();
  }
}
