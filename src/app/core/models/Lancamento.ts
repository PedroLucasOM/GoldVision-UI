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
