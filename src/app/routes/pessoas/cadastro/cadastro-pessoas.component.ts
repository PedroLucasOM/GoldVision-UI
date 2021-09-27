import {Component, OnInit} from '@angular/core';
import {Pessoa} from '../../../core/models/Pessoa';
import {PessoasService} from '../pessoas.service';
import {NgForm} from '@angular/forms';
import {HandleMessageService} from '../../../core/services/handle-message.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './cadastro-pessoas.component.html',
  styleUrls: ['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  codigoPessoa: number;

  constructor(
    private pessoaService: PessoasService,
    private handleMessageService: HandleMessageService,
    private handleErrorService: HandleErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  get isEditing() {
    return Boolean(this.codigoPessoa);
  }

  ngOnInit() {
    this.codigoPessoa = this.route.snapshot.params['codigo'];

    if (this.codigoPessoa) {
      this.buscarPorCodigo();
    }

  }

  cadastrar(form: NgForm) {
    this.pessoaService.cadastrar(this.pessoa)
      .then(() => {
        this.handleMessageService.onShowSuccess('Pessoa cadastrada com sucesso!');
        this.clear(form);
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  atualizar() {
    this.pessoaService.atualizar(this.codigoPessoa, this.pessoa)
      .then(() => {
        this.handleMessageService.onShowSuccess('Pessoa atualizada com sucesso!');
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  salvar(form: NgForm) {
    if (this.codigoPessoa) {
      this.atualizar();
    } else {
      this.cadastrar(form);
    }
  }

  buscarPorCodigo() {
    this.pessoaService.buscarPorCodigo(this.codigoPessoa).then(response => {
      this.pessoa = response;
    }).catch(error => {
      this.handleErrorService.handle(error);
    });
  }

  clear(form: NgForm) {
    form.reset();

    setTimeout(function () {
      this.pessoa = new Pessoa();
      this.codigoPessoa = null;
    }.bind(this), 1);
  }

  novo(form: NgForm) {
    this.clear(form);
    this.router.navigate(['/pessoas/novo']);
  }
}
