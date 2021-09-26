import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  static dashboardUrl = `${environment.ApiURL}/lancamentos`;

  private static converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

  lancamentosPorCategoria(): Promise<any> {
    return this.http.get<Array<any>>(`${DashboardService.dashboardUrl}/estatistica/por-categoria`).toPromise();
  }

  lancamentosPorDia(): Promise<any> {
    return this.http.get<Array<any>>(`${DashboardService.dashboardUrl}/estatistica/por-dia`).toPromise()
      .then(response => {
        DashboardService.converterStringsParaDatas(response);
        return response;
      });
  }
}
