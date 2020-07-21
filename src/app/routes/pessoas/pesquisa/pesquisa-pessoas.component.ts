import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../security/auth.service';
import {Pessoa, PessoaFilter} from '../../../core/models/Pessoa';
import {PessoasService} from '../pessoas.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {Table} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pesquisa-pessoas',
  templateUrl: './pesquisa-pessoas.component.html',
  styleUrls: ['./pesquisa-pessoas.component.css']
})
export class PesquisaPessoasComponent implements OnInit {
  pessoas: Pessoa[];
  pessoaFilter: PessoaFilter = new PessoaFilter();

  @ViewChild('table', {static: true}) table: Table;

  loading: boolean;

  constructor(
    private auth: AuthService,
    private pessoaService: PessoasService,
    private handleService: HandleErrorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  listarPessoas() {
    this.loading = true;
    this.pessoaService.filtrar(this.pessoaFilter).then(data => {
      this.pessoaFilter.total = data['totalElements'];
      this.pessoas = data['content'] as Pessoa[];
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.handleService.handle(error);
    });
  }

  filtrar() {
    this.table.reset();
    this.pessoaFilter.pagina = 0;
    this.listarPessoas();
  }

  confirmDelete(pessoa: Pessoa) {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir ${pessoa.nome}?`,
      header: 'Confirmação de exclusão',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deletar(pessoa);
      }
    });
  }

  atualizarPropriedadeAtivo(pessoa: Pessoa) {
    this.pessoaService.atualizarPropriedadeAtivo(pessoa.codigo, !pessoa.ativo)
      .then(() => {
        this.table.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Operação Concluída',
          detail: `${pessoa.nome} foi ${pessoa.ativo ? 'desativada' : 'ativada'} com sucesso!`
        });
      })
      .catch(error => {
        this.handleService.handle(error);
      });
  }

  deletar(pessoa: Pessoa) {
    this.pessoaService.deletar(pessoa)
      .then(() => {
        this.table.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Operação Concluída',
          detail: `${pessoa.nome} foi excluído(a) com sucesso!`
        });
      }).catch(error => {
      this.handleService.handle(error);
    });
  }

  changePage($event: any) {
    const page = $event.first / $event.rows;
    this.pessoaFilter.pagina = page;
    this.listarPessoas();
  }

  editar(codigo: number) {
    this.router.navigate([`pessoas/editar/${codigo}`]);
  }
}
