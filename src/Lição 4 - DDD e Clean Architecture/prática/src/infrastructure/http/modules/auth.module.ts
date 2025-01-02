import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { JwtStrategy } from '../../security/jwt.strategy';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
      
    // Configuração assíncrona do JwtModule para usar o ConfigService e acessar variáveis de ambiente dinamicamente.
    JwtModule.registerAsync({

      // useFactory é uma função assíncrona que define a configuração do JwtModule.
      // Aqui, usamos o ConfigService para buscar o valor da variável de ambiente 'SECRET_KEY'.
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
      
      // Especifica que o ConfigService deve ser injetado no useFactory.
      inject: [ConfigService],
    }),  
  ],
  providers: [JwtStrategy, LoginUseCase],
  controllers: [AuthController],
  exports: [JwtModule],
})

export class AuthModule {}

