import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../security/auth.guard';
import {PesquisaUsuariosComponent} from './pesquisa/pesquisa-usuarios.component';
import {CadastroUsuariosComponent} from './cadastro/cadastro-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaUsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['LISTAR_USUARIO']
    }
  },
  {
    path: 'novo',
    component: CadastroUsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['SALVAR_USUARIO']
    }
  },
  {
    path: 'editar/:codigo',
    component: CadastroUsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      authorities: ['ATUALIZAR_USUARIO']
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
export class UsuariosRoutingModule {
}
