/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { AuthGuard } from '../guards/auth.guard';
import { GetUser } from 'src/decorators/user-token.decorators';
import { JwtPayload } from 'src/interfaces/jwt-strategy.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req, @GetUser() user: JwtPayload) {
    console.log('user', user);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { user: req.user };
  }
}
