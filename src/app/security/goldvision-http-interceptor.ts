import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class GoldVisionHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/oauth/token') && this.authService.isInvalidAccessToken()) {
      return from(this.authService.newAccessToken())
        .pipe(
          mergeMap(() => {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
            });
            return next.handle(req);
          })
        );
    }
    return next.handle(req);
  }

}
