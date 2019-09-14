import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoutesModule} from './routes.module';

const routes: Routes = [
  {
    path: 'lancamentos',
    loadChildren: () => import('./lancamentos/lancamentos.module').then(module => module.LancamentosModule)
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
export class RoutesRoutingModule { }
