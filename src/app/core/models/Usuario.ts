export class Usuario {
  public codigo: number;
  public nome: string;
  public email: string;
  public senha: string;
  public permissoes: Permissao[] = [];
}

export class UsuarioFilter {
  public nome: string;
  public itensPorPagina = 5;
  public pagina = 0;
  public total: number;
  public isUltimaPagina: boolean;
}

export class Permissao {
  public codigo: string;
  public nome: string;
}
