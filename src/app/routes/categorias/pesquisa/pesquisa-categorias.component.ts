import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {AuthService} from '../../../security/auth.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Categoria, CategoriaFilter} from '../../../core/models/Categoria';
import {CategoriasService} from '../categorias.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pesquisa-categorias',
  templateUrl: './pesquisa-categorias.component.html',
  styleUrls: ['./pesquisa-categorias.component.css']
})
export class PesquisaCategoriasComponent implements OnInit {

  categorias: Categoria[];
  categoriaFilter: CategoriaFilter = new CategoriaFilter();

  loading: boolean;

  @ViewChild('table', {static: true}) table: Table;

  constructor(
    private auth: AuthService,
    private categoriaService: CategoriasService,
    private handleService: HandleErrorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  listarCategorias() {
    this.loading = true;
    this.categoriaService.filtrar(this.categoriaFilter).then(data => {
      this.categoriaFilter.total = data['totalElements'];
      this.categorias = data['content'] as Categoria[];
      this.loading = false;
    }).catch(error => {
      this.handleService.handle(error);
      this.loading = false;
    });
  }

  filtrar() {
    this.table.reset();
    this.categoriaFilter.pagina = 0;
    this.listarCategorias();
  }

  confirmDelete(categoria: Categoria) {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir ${categoria.nome}?`,
      header: 'Confirmação de exclusão',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deletar(categoria);
      }
    });
  }

  deletar(categoria: Categoria) {
    this.categoriaService.deletar(categoria)
      .then(() => {
        this.table.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Operação Concluída',
          detail: `${categoria.nome} foi excluído(a) com sucesso!`
        });
      }).catch(error => {
      this.handleService.handle(error);
    });
  }

  changePage($event: any) {
    const page = $event.first / $event.rows;
    this.categoriaFilter.pagina = page;
    this.listarCategorias();
  }

  editar(codigo: number) {
    this.router.navigate([`categorias/${codigo}`]);
  }
}
