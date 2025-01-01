import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { AuthService } from '../../../domain/services/auth.service';
import { JwtStrategy } from '../../security/jwt.strategy';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1h' } })],
  // providers: [AuthService, JwtStrategy, LoginUseCase],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})

export class AuthModule {}

