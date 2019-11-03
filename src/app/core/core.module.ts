import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {ComponentesModule} from './componentes/componentes.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../security/auth.service';
import {MessageService} from 'primeng/api';
import {SharedModule} from '../shared/shared.module';
import {LancamentosService} from '../routes/lancamentos/lancamentos.service';
import {HandleErrorService} from './services/handle-error.service';
import {AuthGuard} from '../security/auth.guard';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentesModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    NavbarComponent,
    ComponentesModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    MessageService,
    AuthService,
    AuthGuard,
    HandleErrorService,
    LancamentosService
  ]
})
export class CoreModule {
}
