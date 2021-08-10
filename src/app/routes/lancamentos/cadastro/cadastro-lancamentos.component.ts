import {Component, OnInit} from '@angular/core';
import {Categoria, CategoriaFilter} from '../../../core/models/Categoria';
import {CategoriasService} from '../../categorias/categorias.service';
import {HandleErrorService} from '../../../core/services/handle-error.service';
import {Pessoa, PessoaFilter} from '../../../core/models/Pessoa';
import {PessoasService} from '../../pessoas/pessoas.service';
import {LancamentosService} from '../lancamentos.service';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Lancamento, LancamentoFilter} from '../../../core/models/Lancamento';
import {HandleMessageService} from '../../../core/services/handle-message.service';
import {LocationService} from '../../../core/services/location.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-lancamentos',
  templateUrl: './cadastro-lancamentos.component.html',
  styleUrls: ['./cadastro-lancamentos.component.css']
})
export class CadastroLancamentosComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categoriaFilter: CategoriaFilter = new CategoriaFilter();
  pessoaFilter: PessoaFilter = new PessoaFilter();
  lancamentoFilter: LancamentoFilter = new LancamentoFilter();

  categorias: Categoria[] = [];
  pessoas: Pessoa[] = [];

  formulario: FormGroup;
  codigoLancamento: number;

  constructor(
    private categoriaService: CategoriasService,
    private pessoaService: PessoasService,
    private lancamentoService: LancamentosService,
    private handleMessageService: HandleMessageService,
    private handleErrorService: HandleErrorService,
    private route: ActivatedRoute,
    private router: Router,
    public locationService: LocationService,
    private formBuilder: FormBuilder
  ) {
  }

  get isEditing() {
    return Boolean(this.codigoLancamento);
  }

  ngOnInit() {
    this.configurarFormulario();
    this.codigoLancamento = this.route.snapshot.params['codigo'];

    if (this.codigoLancamento) {
      this.buscarPorCodigo();
    }

    this.configurarPessoaFilter();
    this.configurarCategoriaFilter();
    this.listarPessoas();
    this.listarCategorias();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  buscarPorCodigo() {
    this.lancamentoService.buscarPorCodigo(this.codigoLancamento)
      .then(response => {
        this.formulario.patchValue(response);
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  cadastrar() {
    this.lancamentoService.cadastrar(this.formulario.value)
      .then(() => {
        this.handleMessageService.onShowSuccess('Lançamento cadastrado com sucesso!');
        this.clear();
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  atualizar() {
    this.lancamentoService.atualizar(this.codigoLancamento, this.formulario.value)
      .then(() => {
        this.handleMessageService.onShowSuccess('Lançamento atualizado com sucesso!');
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  salvar() {
    if (this.codigoLancamento) {
      this.atualizar();
    } else {
      this.cadastrar();
    }
  }

  listarCategorias() {
    this.categoriaService.filtrar(this.categoriaFilter)
      .then(response => {
        this.categorias = this.categorias.concat(response['content']);
        this.categoriaFilter.isUltimaPagina = response['last'];
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  listarPessoas() {
    this.pessoaService.filtrar(this.pessoaFilter)
      .then(response => {
        this.pessoas = this.pessoas.concat(response['content']);
        this.pessoaFilter.isUltimaPagina = response['last'];
      })
      .catch(error => {
        this.handleErrorService.handle(error);
      });
  }

  onPessoaSearch(event) {
    this.pessoas = [];
    this.configurarPessoaFilter(event['term']);
    this.listarPessoas();
  }

  onCategoriaSearch(event) {
    this.categorias = [];
    this.configurarCategoriaFilter(event['term']);
    this.listarCategorias();
  }

  onPessoaScrollEnded() {
    if (!this.pessoaFilter.isUltimaPagina) {
      this.pessoaFilter.pagina += 1;
      this.listarPessoas();
    }
  }

  onCategoriaScrollEnded() {
    if (!this.categoriaFilter.isUltimaPagina) {
      this.categoriaFilter.pagina += 1;
      this.listarCategorias();
    }
  }

  onPessoaClear() {
    this.pessoas = [];
    this.configurarPessoaFilter();
    this.listarPessoas();
  }

  onCategoriaClear() {
    this.categorias = [];
    this.configurarCategoriaFilter();
    this.listarCategorias();
  }

  configurarCategoriaFilter(nome?: string) {
    this.categoriaFilter = new CategoriaFilter();
    this.categoriaFilter.itensPorPagina = 10;
    this.categoriaFilter.nome = nome;
  }

  configurarPessoaFilter(nome?: string) {
    this.pessoaFilter = new PessoaFilter();
    this.pessoaFilter.itensPorPagina = 10;
    this.pessoaFilter.nome = nome;
  }

  clear() {
    setTimeout(function() {
      this.formulario.reset();
      this.formulario.get('codigo').setValue(this.codigoLancamento);
      this.lancamentoFilter = new LancamentoFilter();
      this.configurarCategoriaFilter();
      this.configurarPessoaFilter();
    }.bind(this), 1);
  }

  novo() {
    this.clear();
    this.router.navigate(['/lancamentos/novo']);
  }
}
