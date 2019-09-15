import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasRoutingModule } from './pessoas-routing.module';
import {CadastroPessoasComponent} from './cadastro/cadastro-pessoas.component';
import {PesquisaPessoasComponent} from './pesquisa/pesquisa-pessoas.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [CadastroPessoasComponent, PesquisaPessoasComponent],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    SharedModule
  ]
})
export class PessoasModule { }
