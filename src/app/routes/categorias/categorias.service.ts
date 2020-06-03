import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Categoria, CategoriaFilter} from '../../core/models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  static url = `${environment.ApiURL}/categorias`;

  constructor(private http: HttpClient) {
  }

  filtrar(categoriaFilter: CategoriaFilter) {
    let params = new HttpParams();

    params = params.set('page', categoriaFilter.pagina.toString());
    params = params.set('size', categoriaFilter.itensPorPagina.toString());

    if (categoriaFilter.nome) {
      params = params.set('nome', categoriaFilter.nome);
    }

    return this.http.get(CategoriasService.url, {params}).toPromise();
  }

  deletar(categoria: Categoria) {
    return this.http.delete(`${CategoriasService.url}/${categoria.codigo}`)
      .toPromise();
  }
}
