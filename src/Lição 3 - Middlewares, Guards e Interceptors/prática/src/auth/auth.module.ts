import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// Módulo que fornece funcionalidades para criar e validar tokens JWT.

import { PassportModule } from '@nestjs/passport';
// Módulo que integra o Passport.js ao NestJS para estratégias de autenticação.

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    // Importa o módulo do Passport para gerenciar estratégias de autenticação.

    JwtModule.register({
      // Registra o módulo JWT com as configurações necessárias.

      secret: 'secretKey',
      // Define a chave secreta usada para assinar e verificar tokens JWT.
      // **IMPORTANTE**: Use variáveis de ambiente para armazenar chaves em produção.

      signOptions: { expiresIn: '1h' },
      // Define o tempo de validade dos tokens para 1 hora.
    }),
  ],
  providers: [AuthService, JwtStrategy],
  // Registra o serviço de autenticação e a estratégia JWT como provedores.

  controllers: [AuthController],
  // Registra o controlador de autenticação.

  exports: [JwtModule],
  // Exporta o módulo JWT para que outros módulos possam utilizá-lo.
})

export class AuthModule {}
