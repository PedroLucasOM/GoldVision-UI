
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
  public ativo: boolean;
  public endereco: Endereco;
}
