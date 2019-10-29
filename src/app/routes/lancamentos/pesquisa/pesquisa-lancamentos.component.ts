import {Component, OnInit} from '@angular/core';
import {LancamentosService} from '../lancamentos.service';

@Component({
  selector: 'app-pesquisa-lancamentos',
  templateUrl: './pesquisa-lancamentos.component.html',
  styleUrls: ['./pesquisa-lancamentos.component.css']
})
export class PesquisaLancamentosComponent implements OnInit {
  lancamentos;

  constructor(private service: LancamentosService) {
  }

  ngOnInit() {
    this.resumir();
  }

  resumir() {
    this.service.resumir().then(data => {
      this.lancamentos = data;
    }).catch(error => {
      console.log(error);
    });
  }

}
