import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// `PassportStrategy` permite criar uma estratégia de autenticação baseada no Passport.js. Passport.js é um middleware de autenticação para Node.js que suporta múltiplas estratégias (como Local, JWT, OAuth, etc.), permitindo validar a identidade do usuário de forma flexível e segura.

import { Strategy, ExtractJwt } from 'passport-jwt';
// `Strategy` é a estratégia de autenticação para JWTs.
// `ExtractJwt` contém métodos para extrair o token JWT de uma requisição.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // `PassportStrategy` é estendido aqui com a estratégia de JWT fornecida por `passport-jwt`.

  constructor() {
    super({
      // `super` chama o construtor da classe pai (PassportStrategy), passando a configuração da estratégia JWT. Isso garante que a classe atual herde os comportamentos necessários para autenticação usando JWT.

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Configura a estratégia para extrair o token do cabeçalho `Authorization` no formato `Bearer <token>`.

      secretOrKey: 'secretKey',
      // Define a chave secreta usada para validar o token.
      // **IMPORTANTE**: Use variáveis de ambiente para armazenar chaves secretas em produção.
    });
  }

  async validate(payload: any) {
    
    // O método `validate` é chamado automaticamente após o token ser validado.
    // Ele deve retornar os dados do usuário ou lançar um erro caso algo esteja errado.

    return { userId: payload.sub, username: payload.username };
    // Aqui retornamos um objeto contendo o `userId` e o `username` do usuário, com base no `payload` do token.
    // Esses dados estarão disponíveis no `request.user` para serem usados em outras partes da aplicação.
  }
}
