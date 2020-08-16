import {Component, OnInit} from '@angular/core';
import {Permissao, Usuario} from '../../../core/models/Usuario';
import {UsuariosService} from '../../usuarios/usuarios.service';
import {HandleMessageService} from '../../../core/services/handle-message.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {PermissoesService} from '../permissoes.service';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.css']
})
export class CadastroUsuariosComponent implements OnInit {

  usuario: Usuario = new Usuario();

  permissoes: Permissao[] = [];

  codigoUsuario: number;
  usuarioSenha: string;
  usuarioConfirmacaoSenha: string;

  constructor(
    private usuarioService: UsuariosService,
    private permissaoService: PermissoesService,
    private handleMessageService: HandleMessageService,
    private handleErrorService: HandleErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  get isEditing() {
    return Boolean(this.codigoUsuario);
  }

  ngOnInit() {
    this.codigoUsuario = this.route.snapshot.params['codigo'];

    if (this.codigoUsuario) {
      this.buscarPorCodigo();
    }

    this.listarPermissoes();
  }

  cadastrar(form: NgForm) {
    console.log(this.usuario.permissoes);
    this.usuario.senha = this.usuarioSenha;
    this.usuarioService.cadastrar(this.usuario)
      .then(() => {
        this.handleMessageService.onShowSuccess('Usuário cadastrado com sucesso!');
        this.clear(form);
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  atualizar() {
    if (this.usuarioSenha) {
      this.usuario.senha = this.usuarioSenha;
    }
    this.usuarioService.atualizar(this.codigoUsuario, this.usuario)
      .then(() => {
        this.handleMessageService.onShowSuccess('Usuário atualizado com sucesso!');
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  salvar(form: NgForm) {
    if (this.codigoUsuario) {
      this.atualizar();
    } else {
      this.cadastrar(form);
    }
  }

  buscarPorCodigo() {
    this.usuarioService.buscarPorCodigo(this.codigoUsuario).then(response => {
      this.usuario = response;
    }).catch(error => {
      this.handleErrorService.handle(error);
    });
  }

  clear(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
      this.codigoUsuario = null;
    }.bind(this), 1);
  }

  novo(form: NgForm) {
    this.clear(form);
    this.router.navigate(['/usuarios/novo']);
  }

  listarPermissoes() {
    this.permissaoService.listar().then((response) => {
      this.permissoes = response;
    }).catch(error => {
      this.handleErrorService.handle(error);
    });
  }
}
