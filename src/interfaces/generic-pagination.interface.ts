export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export interface PaginateOptions {
  page?: number;
  perPage?: number;
}

export interface IPagination<T> {
  data: T[];
  meta: T[];
}

export interface builderSettings<T, K> {
  model: {
    count: (args: { where: K }) => Promise<number>;
    findMany: (args: {
      where: K;
      take?: number;
      skip?: number;
      include?: any; // Para incluir relaciones
      select?: any; // Para seleccionar campos específicos
    }) => Promise<T[]>;
  };
  args: { where: K; include?: any; select?: any }; // Agrega `include` y `select`
  options: PaginateOptions;
}
