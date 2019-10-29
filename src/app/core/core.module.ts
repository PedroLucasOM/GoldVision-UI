import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {ComponentesModule} from './componentes/componentes.module';
import {HttpClientModule} from '@angular/common/http';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthService} from '../security/auth.service';
import {MessageService} from 'primeng/api';
import {SharedModule} from '../shared/shared.module';
import {environment} from '../../environments/environment';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentesModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.whitelistedDomains],
        blacklistedRoutes: [environment.blacklistedDomains]
      }
    }),
    SharedModule
  ],
  exports: [
    NavbarComponent,
    ComponentesModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [JwtHelperService, AuthService, MessageService]
})
export class CoreModule { }
