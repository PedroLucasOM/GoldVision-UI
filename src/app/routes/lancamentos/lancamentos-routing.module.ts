import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PesquisaLancamentosComponent} from './pesquisa/pesquisa-lancamentos.component';
import {CadastroLancamentosComponent} from './cadastro/cadastro-lancamentos.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaLancamentosComponent
  },
  {
    path: 'novo',
    component: CadastroLancamentosComponent
  },
  {
    path: 'editar/:uuid',
    component: CadastroLancamentosComponent
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
export class LancamentosRoutingModule { }
