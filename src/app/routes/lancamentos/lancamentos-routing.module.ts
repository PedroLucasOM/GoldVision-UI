import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PesquisaLancamentosComponent} from './pesquisa/pesquisa-lancamentos.component';
import {CadastroLancamentosComponent} from './cadastro/cadastro-lancamentos.component';
import {AuthGuard} from '../../security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PesquisaLancamentosComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['LISTAR_LANCAMENTO']
    }
  },
  {
    path: 'novo',
    component: CadastroLancamentosComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['SALVAR_LANCAMENTO']
    }
  },
  {
    path: 'editar/:uuid',
    component: CadastroLancamentosComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['ATUALIZAR_LANCAMENTO']
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LancamentosRoutingModule {
}
