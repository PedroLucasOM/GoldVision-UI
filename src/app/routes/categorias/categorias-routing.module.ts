import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PesquisaCategoriasComponent} from './pesquisa/pesquisa-categorias.component';
import {AuthGuard} from '../../security/auth.guard';
import {CadastroCategoriasComponent} from './cadastro/cadastro-categorias.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaCategoriasComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['LISTAR_CATEGORIA']
    }
  },
  {
    path: 'novo',
    component: CadastroCategoriasComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['SALVAR_CATEGORIA']
    }
  },
  {
    path: ':codigo',
    component: CadastroCategoriasComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['ATUALIZAR_CATEGORIA']
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
export class CategoriasRoutingModule {
}
