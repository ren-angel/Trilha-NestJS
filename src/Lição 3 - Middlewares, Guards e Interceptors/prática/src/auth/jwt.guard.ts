import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// `CanActivate` é uma interface usada para implementar a lógica que define se o acesso a uma rota será permitido.
// `ExecutionContext` permite acessar o contexto da requisição (HTTP, WebSocket, etc.).

import { Reflector } from '@nestjs/core';
// `Reflector` é usado para acessar metadados, mas neste caso não é utilizado diretamente no código.

import { JwtService } from '@nestjs/jwt';
// Serviço fornecido pelo NestJS para lidar com JWTs, como criação e validação.

import { Request } from 'express';
// Tipo `Request` é usado para ajudar a tipar o objeto de requisição HTTP.

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  // O construtor injeta o serviço JWT e o Reflector. O JWT será usado para validar tokens.

  canActivate(context: ExecutionContext): boolean {
    // `canActivate` é o método obrigatório da interface `CanActivate`.
    // Ele retorna `true` para permitir o acesso ou `false` para negá-lo.

    const request = context.switchToHttp().getRequest<Request>();
    // Aqui acessamos o objeto da requisição HTTP. Isso nos permite verificar os cabeçalhos, corpo, etc.

    const token = request.headers.authorization?.split(' ')[1];
    // Buscamos o token no cabeçalho `Authorization` (geralmente no formato `Bearer <token>`).
    // O `split(' ')[1]` pega apenas o valor do token.

    if (!token) return false;
    // Se não houver token, negamos o acesso retornando `false`.

    try {

      const decoded = this.jwtService.verify(token);
      // Tentamos verificar o token com o método `verify` do serviço JWT.
      // Se o token for inválido ou expirado, o método lançará um erro.

      request['user'] = decoded;
      // Adicionamos o usuário decodificado à requisição para que as rotas ou serviços possam usá-lo.
      
      return true; // O token é válido, então o acesso é permitido.
    } catch {

      return false; // Se houver algum erro ao verificar o token, negamos o acesso.
    }
  }
}
