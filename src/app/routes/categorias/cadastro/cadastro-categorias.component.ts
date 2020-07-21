import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../../core/models/Categoria';
import {CategoriasService} from '../categorias.service';
import {HandleMessageService} from '../../../core/services/handle-message.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cadastro-categorias',
  templateUrl: './cadastro-categorias.component.html',
  styleUrls: ['./cadastro-categorias.component.css']
})
export class CadastroCategoriasComponent implements OnInit {

  codigoCategoria: number;
  categoria: Categoria = new Categoria();


  constructor(
    private categoriaService: CategoriasService,
    private handleMessageService: HandleMessageService,
    private handleErrorService: HandleErrorService,
    private route: ActivatedRoute
  ) {
  }

  get isEditing() {
    return Boolean(this.codigoCategoria);
  }

  ngOnInit() {
    this.codigoCategoria = this.route.snapshot.params['codigo'];
    if (this.codigoCategoria) {
      this.listarPorCodigo();
    }
  }

  listarPorCodigo() {
    this.categoriaService.listarPorCodigo(this.codigoCategoria)
      .then(response => {
        this.categoria = response;
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  cadastrar(form: NgForm) {
    this.categoriaService.cadastrar(this.categoria)
      .then(() => {
        this.handleMessageService.onShowSuccess('Categoria cadastrada com sucesso!');
        this.limparFormulario(form);
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  atualizar() {
    this.categoriaService.atualizar(this.codigoCategoria, this.categoria)
      .then(() => {
        this.handleMessageService.onShowSuccess('Categoria atualizada com sucesso!');
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  salvar(form?: NgForm) {
    if (this.codigoCategoria) {
      this.atualizar();
    } else {
      this.cadastrar(form);
    }
  }

  limparFormulario(form: NgForm) {
    form.reset();
    this.categoria = new Categoria();
  }

}
