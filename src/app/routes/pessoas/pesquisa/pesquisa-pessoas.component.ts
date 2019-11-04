import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../security/auth.service';
import {Pessoa, PessoaFilter} from '../../../core/models/Pessoa';
import {PessoasService} from '../pessoas.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';

@Component({
  selector: 'app-pesquisa-pessoas',
  templateUrl: './pesquisa-pessoas.component.html',
  styleUrls: ['./pesquisa-pessoas.component.css']
})
export class PesquisaPessoasComponent implements OnInit {
  pessoas: Pessoa[];
  pessoaFilter: PessoaFilter = new PessoaFilter();

  constructor(
    private auth: AuthService,
    private pessoaService: PessoasService,
    private handleService: HandleErrorService
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

  changePage($event: any) {
    const page = $event.first / $event.rows;
    this.pessoaFilter.pagina = page;
    this.filtrar();
  }
}
