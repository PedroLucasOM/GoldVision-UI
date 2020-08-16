import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Usuario, UsuarioFilter} from '../../core/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  static url = `${environment.ApiURL}/usuarios`;

  constructor(private http: HttpClient) {
  }

  filtrar(usuarioFilter: UsuarioFilter): Promise<any[]> {
    let params = new HttpParams();

    params = params.set('page', usuarioFilter.pagina.toString());
    params = params.set('size', usuarioFilter.itensPorPagina.toString());

    if (usuarioFilter.nome) {
      params = params.set('nome', usuarioFilter.nome);
    }

    return this.http.get<any[]>(UsuariosService.url, {params}).toPromise();
  }

  cadastrar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<Usuario>(UsuariosService.url, usuario, {headers}).toPromise();
  }

  atualizar(codigo: number, usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put<Usuario>(`${UsuariosService.url}/${codigo}`, usuario, {headers}).toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {
    return this.http.get<Usuario>(`${UsuariosService.url}/${codigo}`).toPromise();
  }

  deletar(usuario: Usuario) {
    return this.http.delete(`${UsuariosService.url}/${usuario.codigo}`)
      .toPromise();
  }
}
