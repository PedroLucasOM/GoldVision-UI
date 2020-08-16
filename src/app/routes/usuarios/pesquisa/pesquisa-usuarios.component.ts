import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {AuthService} from '../../../security/auth.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {Usuario, UsuarioFilter} from '../../../core/models/Usuario';
import {UsuariosService} from '../usuarios.service';

@Component({
  selector: 'app-pesquisa-usuarios',
  templateUrl: './pesquisa-usuarios.component.html',
  styleUrls: ['./pesquisa-usuarios.component.css']
})
export class PesquisaUsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuarioFilter: UsuarioFilter = new UsuarioFilter();

  @ViewChild('table', {static: true}) table: Table;

  loading: boolean;

  constructor(
    private auth: AuthService,
    private usuarioService: UsuariosService,
    private handleService: HandleErrorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  listarUsuarios() {
    this.loading = true;
    this.usuarioService.filtrar(this.usuarioFilter).then(data => {
      this.usuarioFilter.total = data['totalElements'];
      this.usuarios = data['content'] as Usuario[];
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.handleService.handle(error);
    });
  }

  filtrar() {
    this.table.reset();
    this.usuarioFilter.pagina = 0;
    this.listarUsuarios();
  }

  confirmDelete(usuario: Usuario) {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir ${usuario.nome}?`,
      header: 'Confirmação de exclusão',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deletar(usuario);
      }
    });
  }

  deletar(usuario: Usuario) {
    this.usuarioService.deletar(usuario)
      .then(() => {
        this.table.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Operação Concluída',
          detail: `${usuario.nome} foi excluído(a) com sucesso!`
        });
      }).catch(error => {
      this.handleService.handle(error);
    });
  }

  changePage($event: any) {
    const page = $event.first / $event.rows;
    this.usuarioFilter.pagina = page;
    this.listarUsuarios();
  }

  editar(codigo: number) {
    this.router.navigate([`usuarios/editar/${codigo}`]);
  }

}
