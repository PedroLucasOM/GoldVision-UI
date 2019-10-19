import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { MensagemErroComponent } from './componentes/mensagem-erro/mensagem-erro.component';
import {ComponentesModule} from './componentes/componentes.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentesModule
  ],
  exports: [
    NavbarComponent,
    ComponentesModule
  ]
})
export class CoreModule { }
