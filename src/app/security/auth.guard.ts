import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isInvalidAccessToken()) {
      return this.auth.newAccessToken().then(() => {
        return true;
      }).catch(() => {
        return false;
      });
    } else if (next.data.authorities && !this.auth.hasAnyAuthority(next.data.authorities)) {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
    return true;
  }

}
