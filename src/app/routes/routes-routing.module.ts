import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'lancamentos',
    loadChildren: './lancamentos/lancamentos.module#LancamentosModule'
  },
  {
    path: 'pessoas',
    loadChildren: './pessoas/pessoas.module#PessoasModule'
  },
  {
    path: 'categorias',
    loadChildren: './categorias/categorias.module#CategoriasModule'
  },
  {
    path: 'usuarios',
    loadChildren: './usuarios/usuarios.module#UsuariosModule'
  },
  {
    path: '**',
    redirectTo: 'lancamentos',
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
export class RoutesRoutingModule {
}
