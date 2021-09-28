import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HandleErrorService} from '../core/services/handle-error.service';
import {Router} from '@angular/router';
import {Token} from '../core/models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static url = `${environment.ApiURL}/oauth/token`;
  static revokeUrl = `${environment.ApiURL}/tokens/revoke`;
  token: Token;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private handleError: HandleErrorService,
    private router: Router) {
    this.loadToken();
  }

  login(email, password): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${email}&password=${password}&grant_type=password`;
    return this.http.post(AuthService.url, body, {headers, withCredentials: true}).toPromise()
      .then(response => {
        this.storeToken(response['access_token']);
        this.router.navigate(['/dashboard']);
      }).catch(response => {
        this.handleError.handle(response);
        return Promise.reject(response);
      });
  }

  newAccessToken(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `grant_type=refresh_token`;

    return this.http.post(AuthService.url, body, {headers, withCredentials: true}).toPromise()
      .then(response => {
        this.storeToken(response['access_token']);
        return Promise.resolve(null);
      }).catch(response => {
        this.handleError.handle(response);
        return Promise.resolve(null);
      });
  }

  isInvalidAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    return !accessToken || this.jwtHelper.isTokenExpired(accessToken);
  }

  hasAuthority(authority: string) {
    return this.token && this.token.authorities.includes(authority);
  }

  hasAnyAuthority(authorities: string[]) {
    let hasAuthority = false;
    authorities.forEach(authority => {
      if (this.hasAuthority(authority)) {
        hasAuthority = true;
      }
    });
    return hasAuthority;
  }

  storeToken(accessToken) {
    this.token = this.jwtHelper.decodeToken(accessToken) as Token;
    localStorage.setItem('accessToken', accessToken);
  }

  loadToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.storeToken(accessToken);
    }
  }

  logout() {
    this.http.delete(AuthService.revokeUrl).toPromise()
      .then(() => {
        localStorage.removeItem('accessToken');
        this.token = new Token();
        this.router.navigate(['/login']);
      }).catch(error => this.handleError.handle(error));
  }

}
