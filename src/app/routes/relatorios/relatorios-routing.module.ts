import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RelatorioLancamentosComponent} from './relatorio-lancamentos/relatorio-lancamentos.component';
import {AuthGuard} from '../../security/auth.guard';

const routes: Routes = [
  {
    path: 'lancamentos',
    component: RelatorioLancamentosComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['LISTAR_LANCAMENTO']
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
