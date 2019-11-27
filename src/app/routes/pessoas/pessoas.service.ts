import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Pessoa, PessoaFilter} from '../../core/models/Pessoa';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  static url = `${environment.ApiURL}/pessoas`;

  constructor(private http: HttpClient) {
  }

  filtrar(pessoaFilter: PessoaFilter) {
    let params = new HttpParams();

    params = params.set('page', pessoaFilter.pagina.toString());
    params = params.set('size', pessoaFilter.itensPorPagina.toString());

    if (pessoaFilter.nome) {
      params = params.set('nome', pessoaFilter.nome);
    }

    return this.http.get(PessoasService.url, {params}).toPromise();
  }

  atualizarPropriedadeAtivo(codigo: number, ativo: boolean) {
    return this.http.put(`${PessoasService.url}/${codigo}/ativo`, ativo,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}).toPromise();
  }

  deletar(pessoa: Pessoa) {
    return this.http.delete(`${PessoasService.url}/${pessoa.codigo}`)
      .toPromise();
  }
}
