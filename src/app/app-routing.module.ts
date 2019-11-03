import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './security/login/login.component';
import {NaoAutorizadoComponent} from './core/componentes/nao-autorizado/nao-autorizado.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    loadChildren: './routes/routes.module#RoutesModule'
  },
  {
    path: 'nao-autorizado',
    component: NaoAutorizadoComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
