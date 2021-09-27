import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PessoasRoutingModule} from './pessoas-routing.module';
import {CadastroPessoasComponent} from './cadastro/cadastro-pessoas.component';
import {PesquisaPessoasComponent} from './pesquisa/pesquisa-pessoas.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {ComponentesModule} from '../../core/componentes/componentes.module';
import {PessoasService} from './pessoas.service';
import { CadastroContatoComponent } from './cadastro-contato/cadastro-contato.component';


@NgModule({
  declarations: [CadastroPessoasComponent, PesquisaPessoasComponent, CadastroContatoComponent],
  imports: [
    CommonModule,
    FormsModule,
    PessoasRoutingModule,
    SharedModule,
    ComponentesModule
  ],
  providers: [PessoasService]
})
export class PessoasModule {
}
