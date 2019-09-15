import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PesquisaPessoasComponent} from './pesquisa/pesquisa-pessoas.component';
import {CadastroPessoasComponent} from './cadastro/cadastro-pessoas.component';

const routes: Routes = [
  {
    path: '',
    component: PesquisaPessoasComponent
  },
  {
    path: 'novo',
    component: CadastroPessoasComponent
  },
  {
    path: 'editar/:uuid',
    component: CadastroPessoasComponent
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
export class PessoasRoutingModule { }
