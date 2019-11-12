import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../security/auth.service';
import {Pessoa, PessoaFilter} from '../../../core/models/Pessoa';
import {PessoasService} from '../pessoas.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {Table} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-pesquisa-pessoas',
  templateUrl: './pesquisa-pessoas.component.html',
  styleUrls: ['./pesquisa-pessoas.component.css']
})
export class PesquisaPessoasComponent implements OnInit {
  pessoas: Pessoa[];
  pessoaFilter: PessoaFilter = new PessoaFilter();

  @ViewChild('table', {static: true}) table: Table;

  constructor(
    private auth: AuthService,
    private pessoaService: PessoasService,
    private handleService: HandleErrorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
  }

  filtrar() {
    this.pessoaService.filtrar(this.pessoaFilter).then(data => {
      this.pessoaFilter.total = data['totalElements'];
      this.pessoas = data['content'] as Pessoa[];
    }).catch(error => {
      this.handleService.handle(error);
    });
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

  deletar(pessoa: Pessoa) {
    this.pessoaService.deletar(pessoa)
      .then(() => {
        this.table.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Operação Concluída!',
          detail: `${pessoa.nome} foi excluído(a) com sucesso!`
        });
      }).catch(error => {
      this.handleService.handle(error);
    });
  }

  changePage($event: any) {
    const page = $event.first / $event.rows;
    this.pessoaFilter.pagina = page;
    this.filtrar();
  }
}
