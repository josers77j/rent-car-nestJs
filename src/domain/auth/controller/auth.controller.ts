import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() login: LoginDto) {
    return this.authService.create(login);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}
