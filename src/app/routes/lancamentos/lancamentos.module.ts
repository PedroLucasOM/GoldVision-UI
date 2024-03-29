import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroLancamentosComponent} from './cadastro/cadastro-lancamentos.component';
import {PesquisaLancamentosComponent} from './pesquisa/pesquisa-lancamentos.component';
import {LancamentosRoutingModule} from './lancamentos-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentesModule} from '../../core/componentes/componentes.module';
import {LancamentosService} from './lancamentos.service';
import {FileUploadModule} from "primeng/fileupload";
import {ProgressSpinnerModule} from "primeng/primeng";

@NgModule({
  declarations: [CadastroLancamentosComponent, PesquisaLancamentosComponent],
  imports: [
    CommonModule,
    FormsModule,
    LancamentosRoutingModule,
    SharedModule,
    ComponentesModule,
    ReactiveFormsModule,
    FileUploadModule,
    ProgressSpinnerModule
  ],
  providers: [LancamentosService]
})
export class LancamentosModule {
}
