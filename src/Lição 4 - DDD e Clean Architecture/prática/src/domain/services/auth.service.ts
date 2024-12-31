import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

@Injectable()
export class AuthService {

  constructor(private readonly loginUseCase: LoginUseCase) {}

  login(user: { username: string; id: number }) {
    
    return this.loginUseCase.execute(user.username, user.id);
  }
}
