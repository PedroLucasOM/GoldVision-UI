import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SecurityRoutingModule} from './security-routing.module';
import {FormsModule} from '@angular/forms';
import {ComponentesModule} from '../core/componentes/componentes.module';
import {SharedModule} from '../shared/shared.module';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {GoldVisionHttpInterceptor} from './goldvision-http-interceptor';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ComponentesModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('accessToken');
        },
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedDomains
      }
    })
  ],
  exports: [],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GoldVisionHttpInterceptor,
      multi: true
    }
  ]
})
export class SecurityModule {
}
