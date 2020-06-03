import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PesquisaCategoriasComponent} from './pesquisa/pesquisa-categorias.component';
import {CategoriasRoutingModule} from './categorias-routing.module';
import {CategoriasService} from './categorias.service';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {ComponentesModule} from '../../core/componentes/componentes.module';


@NgModule({
  declarations: [PesquisaCategoriasComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ComponentesModule,
    CategoriasRoutingModule
  ],
  providers: [CategoriasService]
})
export class CategoriasModule {
}
