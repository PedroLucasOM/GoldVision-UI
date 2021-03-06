import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroLancamentosComponent} from './cadastro/cadastro-lancamentos.component';
import {PesquisaLancamentosComponent} from './pesquisa/pesquisa-lancamentos.component';
import {LancamentosRoutingModule} from './lancamentos-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {ComponentesModule} from '../../core/componentes/componentes.module';
import {LancamentosService} from './lancamentos.service';

@NgModule({
  declarations: [CadastroLancamentosComponent, PesquisaLancamentosComponent],
  imports: [
    CommonModule,
    FormsModule,
    LancamentosRoutingModule,
    SharedModule,
    ComponentesModule
  ],
  providers: [LancamentosService]
})
export class LancamentosModule {
}
