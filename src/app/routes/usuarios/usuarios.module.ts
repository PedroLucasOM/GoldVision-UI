import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroUsuariosComponent} from './cadastro/cadastro-usuarios.component';
import {PesquisaUsuariosComponent} from './pesquisa/pesquisa-usuarios.component';
import {UsuariosRoutingModule} from './usuarios-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {ComponentesModule} from '../../core/componentes/componentes.module';
import {UsuariosService} from './usuarios.service';
import {DiretivasModule} from '../../core/diretivas/diretivas.module';
import {PermissoesService} from './permissoes.service';


@NgModule({
  declarations: [CadastroUsuariosComponent, PesquisaUsuariosComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UsuariosRoutingModule,
    ComponentesModule,
    DiretivasModule
  ],
  providers: [UsuariosService, PermissoesService]
})
export class UsuariosModule {
}
