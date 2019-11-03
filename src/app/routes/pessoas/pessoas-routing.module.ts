import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PesquisaPessoasComponent} from './pesquisa/pesquisa-pessoas.component';
import {CadastroPessoasComponent} from './cadastro/cadastro-pessoas.component';
import {AuthGuard} from '../../security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PesquisaPessoasComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['LISTAR_PESSOA']
    }
  },
  {
    path: 'novo',
    component: CadastroPessoasComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['SALVAR_PESSOA']
    }
  },
  {
    path: 'editar/:uuid',
    component: CadastroPessoasComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['ATUALIZAR_PESSOA']
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
  exports: [RouterModule]
})
export class PessoasRoutingModule {
}
