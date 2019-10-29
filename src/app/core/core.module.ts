import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {ComponentesModule} from './componentes/componentes.module';
import {HttpClientModule} from '@angular/common/http';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthService} from '../security/auth.service';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentesModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })
  ],
  exports: [
    NavbarComponent,
    ComponentesModule,
    HttpClientModule
  ],
  providers: [JwtHelperService, AuthService]
})
export class CoreModule { }
