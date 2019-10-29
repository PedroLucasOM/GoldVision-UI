import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Lancamento} from '../../core/models/Lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  static lancamentosUrl = `${environment.ApiURL}/lancamentos`;

  constructor(private http: HttpClient) {
  }

  resumir(): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${LancamentosService.lancamentosUrl}?resumir`).toPromise();
  }
}
