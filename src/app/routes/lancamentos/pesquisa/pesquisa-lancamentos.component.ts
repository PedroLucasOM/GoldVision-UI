import {Component, OnInit} from '@angular/core';
import {LancamentosService} from '../lancamentos.service';
import {AuthService} from '../../../security/auth.service';
import {Lancamento, LancamentoFilter} from '../../../core/models/Lancamento';
import {HandleErrorService} from '../../../core/services/handle-error.service';

@Component({
  selector: 'app-pesquisa-lancamentos',
  templateUrl: './pesquisa-lancamentos.component.html',
  styleUrls: ['./pesquisa-lancamentos.component.css']
})
export class PesquisaLancamentosComponent implements OnInit {

  lancamentos: Lancamento[];
  lancamentoFilter: LancamentoFilter = new LancamentoFilter();

  constructor(
    private service: LancamentosService,
    private auth: AuthService,
    private handle: HandleErrorService
  ) {
  }

  ngOnInit() {}

  resumir() {
    this.service.resumir(this.lancamentoFilter).then(data => {
      this.lancamentoFilter.total = data.totalElements;
      this.lancamentos = data.content as Lancamento[];
    }).catch(error => {
      this.handle.handle(error);
    });
  }

  changePage($event: any) {
    console.log($event);
    const page = $event.first / $event.rows;
    this.lancamentoFilter.pagina = page;
    this.resumir();
  }
}
