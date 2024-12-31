import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// Serviço usado para criar e manipular tokens JWT.

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) {}
  // Injetamos o serviço `JwtService` para usar suas funcionalidades, como gerar tokens.

  async login(user: { username: string, id: number }) {
    // Método responsável por gerar um token JWT para um usuário autenticado.
    // Recebe um objeto `user` com o nome de usuário e o ID.

    const payload = { username: user.username, sub: user.id };
    // O `payload` é a parte do token que contém os dados que queremos codificar.
    // `username` é o nome do usuário, e `sub` (abreviação de "subject") é o ID do usuário.

    return {
      access_token: this.jwtService.sign(payload),
      // Gera um token JWT assinado com o `payload` e o retorna no formato de objeto.
    };
  }
}
