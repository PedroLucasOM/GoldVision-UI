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

  filtrar(pessoaFilter: PessoaFilter): Promise<any[]> {
    let params = new HttpParams();

    params = params.set('page', pessoaFilter.pagina.toString());
    params = params.set('size', pessoaFilter.itensPorPagina.toString());

    if (pessoaFilter.nome) {
      params = params.set('nome', pessoaFilter.nome);
    }

    return this.http.get<any[]>(PessoasService.url, {params}).toPromise();
  }

  cadastrar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(PessoasService.url, pessoa, {headers}).toPromise();
  }

  atualizar(codigo: number, pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${PessoasService.url}/${codigo}`, pessoa, {headers}).toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${PessoasService.url}/${codigo}`).toPromise();
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
