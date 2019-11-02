import {Component, OnInit} from '@angular/core';
import {LancamentosService} from '../lancamentos.service';
import {AuthService} from '../../../security/auth.service';

@Component({
  selector: 'app-pesquisa-lancamentos',
  templateUrl: './pesquisa-lancamentos.component.html',
  styleUrls: ['./pesquisa-lancamentos.component.css']
})
export class PesquisaLancamentosComponent implements OnInit {
  lancamentos;

  constructor(
    private service: LancamentosService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.resumir();
  }

  resumir() {
    this.service.resumir().then(data => {
      this.lancamentos = data;
    }).catch(error => {
    });
  }

}
