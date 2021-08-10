import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Lancamento, LancamentoFilter} from '../../core/models/Lancamento';
import {UtilService} from '../../core/services/util.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  static lancamentosUrl = `${environment.ApiURL}/lancamentos`;

  constructor(
    private http: HttpClient,
    private utilService: UtilService) {
  }

  resumir(lancamentoFilter: LancamentoFilter): Promise<any[]> {
    let params = new HttpParams();

    params = params.set('page', lancamentoFilter.pagina.toString());
    params = params.set('size', lancamentoFilter.itensPorPagina.toString());

    if (lancamentoFilter.descricao) {
      params = params.set('descricao', lancamentoFilter.descricao);
    }

    if (lancamentoFilter.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', lancamentoFilter.dataVencimentoDe);
    }

    if (lancamentoFilter.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', lancamentoFilter.dataVencimentoAte);
    }

    return this.http.get<any[]>(`${LancamentosService.lancamentosUrl}/resumir`, {params}).toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${LancamentosService.lancamentosUrl}/${codigo}`).toPromise();
  }

  cadastrar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    lancamento.dataVencimento = this.utilService.onFormatDate(lancamento.dataVencimento);
    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = this.utilService.onFormatDate(lancamento.dataPagamento);
    }

    return this.http.post<Lancamento>(LancamentosService.lancamentosUrl, lancamento, {headers}).toPromise();
  }

  atualizar(codigo: number, lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    lancamento.dataVencimento = this.utilService.onFormatDate(lancamento.dataVencimento);
    if (lancamento.dataPagamento) {
      lancamento.dataPagamento = this.utilService.onFormatDate(lancamento.dataPagamento);
    }

    return this.http.put<Lancamento>(`${LancamentosService.lancamentosUrl}/${codigo}`, lancamento, {headers}).toPromise();
  }

  deletar(lancamento: Lancamento) {
    return this.http.delete(`${LancamentosService.lancamentosUrl}/${lancamento.codigo}`).toPromise();
  }
}
