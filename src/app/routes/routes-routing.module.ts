import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'relatorios',
    loadChildren: './relatorios/relatorios.module#RelatoriosModule'
  },
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
    redirectTo: 'dashboard',
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
