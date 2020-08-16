import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Permissao} from '../../core/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class PermissoesService {

  static url = `${environment.ApiURL}/permissoes`;

  constructor(private http: HttpClient) {
  }

  listar(): Promise<Permissao[]> {
    return this.http.get<Permissao[]>(PermissoesService.url).toPromise();
  }
}
