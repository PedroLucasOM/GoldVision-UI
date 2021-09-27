export class Endereco {
  public logradouro: string;
  public numero: string;
  public complemento: string;
  public bairro: string;
  public cidade: string;
  public estado: string;
  public cep: string;
}

export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number,
              nome?: string,
              email?: string,
              telefone?: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}

export class Pessoa {
  public codigo: number;
  public nome: string;
  public ativo = false;
  public endereco: Endereco = new Endereco();
  public contatos = new Array<Contato>();
}

export class PessoaFilter {
  public nome: string;
  public itensPorPagina = 5;
  public pagina = 0;
  public total: number;
  public isUltimaPagina: boolean;
}
