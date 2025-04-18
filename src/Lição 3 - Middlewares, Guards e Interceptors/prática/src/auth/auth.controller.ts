import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: { username: string, id: number }) {
    
    return this.authService.login(user);
    // Chama o serviço de autenticação para gerar um token JWT e retorna o resultado.
  }
}
