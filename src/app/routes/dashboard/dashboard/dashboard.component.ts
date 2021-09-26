import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {UtilService} from '../../../core/services/util.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData;
  lineChartData;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(private dashboardService: DashboardService,
              private handleErrorService: HandleErrorService,
              private utilService: UtilService,
              private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria().then(response => {
      if (response) {
        this.pieChartData = {
          labels: response.map(object => object['categoria']['nome']),
          datasets: [
            {
              data: response.map(object => object['total']),
              backgroundColor: this.utilService.colorGenerator(response.length)
            }
          ]
        };
      }
    }).catch(error => this.handleErrorService.handle(error));
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(response => {
        if (response) {
          const diasDoMes = this.configurarDiasMes();
          const totaisReceitas = this.totaisPorCadaDiaMes(
            response.filter(dado => dado.tipoLancamento === 'RECEITA'), diasDoMes);
          const totaisDespesas = this.totaisPorCadaDiaMes(
            response.filter(dado => dado.tipoLancamento === 'DESPESA'), diasDoMes);

          this.lineChartData = {
            labels: diasDoMes.map(dia => dia.toString()),
            datasets: [
              {
                label: 'Receitas',
                data: totaisReceitas,
                borderColor: '#3366CC'
              }, {
                label: 'Despesas',
                data: totaisDespesas,
                borderColor: '#D62B00'
              }
            ]
          };
        }
      });
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;

          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

}
