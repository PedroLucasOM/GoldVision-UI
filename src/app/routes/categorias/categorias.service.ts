import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Categoria, CategoriaFilter} from '../../core/models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  static url = `${environment.ApiURL}/categorias`;

  constructor(private http: HttpClient) {
  }

  filtrar(categoriaFilter: CategoriaFilter): Promise<any[]> {
    let params = new HttpParams();

    params = params.set('page', categoriaFilter.pagina.toString());
    params = params.set('size', categoriaFilter.itensPorPagina.toString());

    if (categoriaFilter.nome) {
      params = params.set('nome', categoriaFilter.nome);
    }

    return this.http.get<any[]>(CategoriasService.url, {params}).toPromise();
  }

  listarPorCodigo(codigo: number) {
    return this.http.get<Categoria>(`${CategoriasService.url}/${codigo}`).toPromise();
  }

  cadastrar(categoria: Categoria): Promise<Categoria> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<Categoria>(CategoriasService.url, categoria, {headers}).toPromise();
  }

  atualizar(codigo: number, categoria: Categoria) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.put<Categoria>(`${CategoriasService.url}/${codigo}`, categoria).toPromise();
  }

  deletar(categoria: Categoria) {
    return this.http.delete(`${CategoriasService.url}/${categoria.codigo}`)
      .toPromise();
  }
}
