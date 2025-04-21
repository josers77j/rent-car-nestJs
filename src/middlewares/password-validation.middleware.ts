/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { passwordUserDto } from 'src/domain/users/dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class DemoMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: () => void) {
    //Argumento del middleware
    //es posible agregar un try catch de ser necesario
    const { password } = req.body as unknown as passwordUserDto;
    const userId = 1; // Todo we need create a decorator that can extrac from the jwt the user information, and get the user id for this password validation

    const passwordFromDb = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    const pass = passwordFromDb['password'];

    const isPasswordValid = await bcrypt.compare(password, pass);

    if (!isPasswordValid) {
      throw new UnprocessableEntityException(
        'password does not match with the password from the database',
      );
    }
    next();
  }
}
