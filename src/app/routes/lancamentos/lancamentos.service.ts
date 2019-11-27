import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Lancamento, LancamentoFilter} from '../../core/models/Lancamento';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  static lancamentosUrl = `${environment.ApiURL}/lancamentos`;

  constructor(private http: HttpClient) {
  }

  resumir(lancamentoFilter: LancamentoFilter): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', lancamentoFilter.pagina.toString());
    params = params.set('size', lancamentoFilter.itensPorPagina.toString());

    if (lancamentoFilter.descricao) {
      params = params.set('descricao', lancamentoFilter.descricao);
    }

    if (lancamentoFilter.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', moment(lancamentoFilter.dataVencimentoDe).format('DD-MM-YYYY'));
    }

    if (lancamentoFilter.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', moment(lancamentoFilter.dataVencimentoAte).format('DD-MM-YYYY'));
    }

    return this.http.get(`${LancamentosService.lancamentosUrl}?resumir`, {params}).toPromise();
  }

  deletar(lancamento: Lancamento) {
    return this.http.delete(`${LancamentosService.lancamentosUrl}/${lancamento.codigo}`).toPromise();
  }
}
