import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentosService} from '../lancamentos.service';
import {AuthService} from '../../../security/auth.service';
import {Lancamento, LancamentoFilter} from '../../../core/models/Lancamento';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {UtilService} from '../../../core/services/util.service';
import {LocationService} from '../../../core/services/location.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pesquisa-lancamentos',
  templateUrl: './pesquisa-lancamentos.component.html',
  styleUrls: ['./pesquisa-lancamentos.component.css']
})
export class PesquisaLancamentosComponent implements OnInit {

  lancamentos: Lancamento[];
  lancamentoFilter: LancamentoFilter = new LancamentoFilter();

  dataVencimentoDe: Date;
  dataVencimentoAte: Date;

  @ViewChild('lancamentoTable', {static: false}) table: Table;

  loading: boolean;

  constructor(
    private service: LancamentosService,
    private auth: AuthService,
    private handleService: HandleErrorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public locationService: LocationService,
    private utilService: UtilService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  listarLancamentos() {
    this.loading = true;

    if (this.dataVencimentoDe) {
      this.lancamentoFilter.dataVencimentoDe = this.utilService.onFormatDate(this.dataVencimentoDe);
    }

    if (this.dataVencimentoAte) {
      this.lancamentoFilter.dataVencimentoAte = this.utilService.onFormatDate(this.dataVencimentoAte);
    }

    this.service.resumir(this.lancamentoFilter).then(data => {
      this.lancamentoFilter.total = data['totalElements'];
      this.lancamentos = data['content'] as Lancamento[];
      this.loading = false;
    }).catch(error => {
      this.handleService.handle(error);
      this.loading = false;
    });
  }

  resumir() {
    this.table.reset();
    this.lancamentoFilter.pagina = 0;
    this.listarLancamentos();
  }

  changePage($event: any) {
    const page = $event.first / $event.rows;
    this.lancamentoFilter.pagina = page;
    this.listarLancamentos();
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

  editar(codigo: number) {
    this.router.navigate([`lancamentos/editar/${codigo}`]);
  }
}
