import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from 'src/application/use-cases/login.use-case';

@Controller('auth')
export class AuthController {

  constructor(private loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() user: { username: string, id: number }) {
    
    return this.loginUseCase.execute(user.username, user.id);
  }
}
