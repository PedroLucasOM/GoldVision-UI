export class Categoria {
  public codigo: number;
  public nome: string;
}

export class CategoriaFilter {
  public nome: string;
  public itensPorPagina = 5;
  public pagina = 0;
  public total: number;
}
