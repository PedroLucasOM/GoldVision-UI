import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MensagemErroComponent} from './mensagem-erro/mensagem-erro.component';
import {SharedModule} from '../../shared/shared.module';
import {MessageModule} from 'primeng/message';
import {NaoAutorizadoComponent} from './nao-autorizado/nao-autorizado.component';


@NgModule({
  declarations: [MensagemErroComponent, NaoAutorizadoComponent],
  imports: [
    CommonModule,
    SharedModule,
    MessageModule
  ],
  exports: [
    MensagemErroComponent
  ]
})
export class ComponentesModule {
}
