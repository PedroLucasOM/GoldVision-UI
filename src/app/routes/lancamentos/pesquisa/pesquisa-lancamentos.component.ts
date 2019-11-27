import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentosService} from '../lancamentos.service';
import {AuthService} from '../../../security/auth.service';
import {Lancamento, LancamentoFilter} from '../../../core/models/Lancamento';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-pesquisa-lancamentos',
  templateUrl: './pesquisa-lancamentos.component.html',
  styleUrls: ['./pesquisa-lancamentos.component.css']
})
export class PesquisaLancamentosComponent implements OnInit {

  lancamentos: Lancamento[];
  lancamentoFilter: LancamentoFilter = new LancamentoFilter();

  @ViewChild('lancamentoTable', {static: false}) table: Table;

  constructor(
    private service: LancamentosService,
    private auth: AuthService,
    private handleService: HandleErrorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
  }

  resumir() {
    this.service.resumir(this.lancamentoFilter).then(data => {
      this.lancamentoFilter.total = data['totalElements'];
      this.lancamentos = data['content'] as Lancamento[];
    }).catch(error => {
      this.handleService.handle(error);
    });
  }

  changePage($event: any) {
    const page = $event.first / $event.rows;
    this.lancamentoFilter.pagina = page;
    this.resumir();
  }

  confirmDelete(lancamento: Lancamento) {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir o lançamento de descrição ${lancamento.descricao}?`,
      header: 'Confirmação de exclusão',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deletar(lancamento);
      }
    });
  }

  deletar(lancamento: Lancamento) {
    this.service.deletar(lancamento)
      .then(() => {
        this.table.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Operação Concluída!',
          detail: `${lancamento.descricao} foi excluído(a) com sucesso!`
        });
      }).catch(error => {
      this.handleService.handle(error);
    });
  }

}
