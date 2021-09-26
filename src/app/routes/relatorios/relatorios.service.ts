import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {HttpParams} from '@angular/common/http';
import {UtilService} from '../../core/services/util.service';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  static url = `${environment.ApiURL}/lancamentos`;

  constructor(private http: HttpClient,
              private utilService: UtilService) {}

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new HttpParams()
      .set('inicio', this.utilService.onFormatDate(inicio))
      .set('fim', this.utilService.onFormatDate(fim));

    return this.http.get(`${RelatoriosService.url}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
  }
}
