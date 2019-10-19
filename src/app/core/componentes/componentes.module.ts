import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MensagemErroComponent} from './mensagem-erro/mensagem-erro.component';
import {SharedModule} from '../../shared/shared.module';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [MensagemErroComponent],
  imports: [
    CommonModule,
    SharedModule,
    MessageModule
  ],
  exports: [
    MensagemErroComponent
  ]
})
export class ComponentesModule { }
