import { Component, OnInit } from '@angular/core';
import {LocationService} from "../../../core/services/location.service";
import {RelatoriosService} from "../relatorios.service";

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;


  constructor(public locationService: LocationService,
  private relatoriosService: RelatoriosService) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }
}
