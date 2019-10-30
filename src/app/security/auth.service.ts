import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HandleErrorService} from '../core/services/handle-error.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static url = `${environment.ApiURL}/oauth/token`;
  static payloadToken: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private handleError: HandleErrorService,
    private router: Router) {
    this.loadToken();
  }

  login(email, password) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${email}&password=${password}&grant_type=password`;
    return this.http.post(AuthService.url, body, {headers}).toPromise()
      .then(response => {
        this.storeToken(response['access_token']);
        this.router.navigate(['/lancamentos']);
      }).catch(response => {
        this.handleError.handle(response);
      });
  }

  logout() {
    localStorage.removeItem('token');
    AuthService.payloadToken = '';
    this.router.navigate(['/login']);
  }

  storeToken(token) {
    AuthService.payloadToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  loadToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.storeToken(token);
    }
  }
}
