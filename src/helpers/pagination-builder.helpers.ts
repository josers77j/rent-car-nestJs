/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  builderSettings,
  PaginatedResult,
} from 'src/interfaces/generic-pagination.interface';

export async function builderPagination<T, K>({
  model,
  args,
  options,
}: builderSettings<T, K>): Promise<PaginatedResult<T>> {
  const page = Number(options.page || 1);
  const perPage = Number(options.perPage || 10);
  const skip = page > 0 ? perPage * (page - 1) : 0;

  const [total, data] = await Promise.all([
    model.count({ where: args['where'] }),
    model.findMany({
      ...args,
      take: perPage,
      skip,
      include: args['include'], // Incluye relaciones
      select: args['select'], // Selecciona campos específicos
    }),
  ]);

  const lastPage = Math.ceil(total / perPage);

  return {
    data,
    meta: {
      total,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    },
  };
}
