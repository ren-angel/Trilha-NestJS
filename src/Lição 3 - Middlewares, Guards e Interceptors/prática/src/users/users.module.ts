import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule], // Importa o módulo de autenticação
  controllers: [UsersController],
})
export class UsersModule {}
