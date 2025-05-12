/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/interfaces/jwt-strategy.interface';

export const GetUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // `user` es agregado por el guard de JWT

    // Si se pasa un campo específico (como 'id' o 'email'), retorna solo ese campo
    return data ? user?.[data] : user;
  },
);
