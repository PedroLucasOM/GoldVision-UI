import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import {RelatoriosRoutingModule} from './relatorios-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {RelatoriosService} from './relatorios.service';



@NgModule({
  declarations: [RelatorioLancamentosComponent],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [RelatoriosService]
})
export class RelatoriosModule { }
