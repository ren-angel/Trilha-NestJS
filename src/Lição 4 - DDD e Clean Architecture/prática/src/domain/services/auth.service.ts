import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

@Injectable()
export class AuthService {

  // Injetamos os casos de uso no seu apropriado service e o executamos.
  constructor(private readonly loginUseCase: LoginUseCase) {}

  login(user: { username: string; id: number }) {

    return this.loginUseCase.execute(user.username, user.id);
  }
}
