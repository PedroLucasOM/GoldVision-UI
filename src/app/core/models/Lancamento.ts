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
  public tipo: TipoLancamento;
  public categoria: Categoria;
  public pessoa: Pessoa;
}

export class LancamentoFilter {
  public descricao: string;
  public dataVencimentoDe: Date;
  public dataVencimentoAte: Date;
  public itensPorPagina = 5;
  public pagina = 0;
  public total: number;
}
