import {Categoria} from './Categoria';
import {Pessoa} from './Pessoa';

export enum TipoLancamento {
  Despesa = 'DESPESA',
  Receita = 'RECEITA'
}

export class Lancamento {
  public codigo: number;
  public dataPagamento: string;
  public dataVencimento: string;
  public descricao: string;
  public observacao: string;
  public valor: number;
  public tipo: TipoLancamento = TipoLancamento.Receita;
  public categoria: Categoria = new Categoria();
  public pessoa: Pessoa = new Pessoa();
}

export class LancamentoFilter {
  public descricao: string;
  public dataVencimentoDe: string;
  public dataVencimentoAte: string;
  public itensPorPagina = 5;
  public pagina = 0;
  public total: number;
}
