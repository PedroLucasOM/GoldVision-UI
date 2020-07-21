export class Endereco {
  public logradouro: string;
  public numero: string;
  public complemento: string;
  public bairro: string;
  public cidade: string;
  public estado: string;
  public cep: string;
}

export class Pessoa {
  public codigo: number;
  public nome: string;
  public ativo = false;
  public endereco: Endereco = new Endereco();
}

export class PessoaFilter {
  public nome: string;
  public itensPorPagina = 5;
  public pagina = 0;
  public total: number;
  public isUltimaPagina: boolean;
}
