import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {ComponentesModule} from './componentes/componentes.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../security/auth.service';
import {HandleMessageService} from '../core/services/handle-message.service';
import {SharedModule} from '../shared/shared.module';
import {HandleErrorService} from './services/handle-error.service';
import {AuthGuard} from '../security/auth.guard';
import {NavbarService} from './services/navbar.service';
import {MessageService} from 'primeng/api';
import {LocationService} from './services/location.service';
import {UtilService} from './services/util.service';
import {CustomValidationService} from './services/custom-validation.service';
import {DiretivasModule} from './diretivas/diretivas.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentesModule,
    DiretivasModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    NavbarComponent,
    ComponentesModule,
    DiretivasModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    MessageService,
    HandleMessageService,
    AuthService,
    AuthGuard,
    HandleErrorService,
    NavbarService,
    LocationService,
    UtilService,
    CustomValidationService
  ]
})
export class CoreModule {
}
