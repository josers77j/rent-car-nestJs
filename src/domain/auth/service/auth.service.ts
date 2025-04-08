import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  create(loginDto: LoginDto) {
    console.log(loginDto);
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }
}
