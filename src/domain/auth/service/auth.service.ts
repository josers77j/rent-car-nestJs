import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersService } from 'src/domain/users/service/users.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByUserEmail(email);

    const {
      password: passwordFromDb,
      email: emailFromDb,
      name,
      role,
      id,
    } = user;

    const isPasswordValid = await bcrypt.compare(password, passwordFromDb);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException(
        'usuario u contraseña invalidos, intente de nuevo.',
      );
    }

    const payload = { id, email: emailFromDb, name, role: role?.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id,
        email: emailFromDb,
        name,
        role: role?.name,
      },
    };
  }
}
