import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SecurityRoutingModule} from './security-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {ComponentesModule} from '../core/componentes/componentes.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedModule,
    FormsModule,
    ComponentesModule
  ],
  exports: [],
  providers: []
})
export class SecurityModule {
}
