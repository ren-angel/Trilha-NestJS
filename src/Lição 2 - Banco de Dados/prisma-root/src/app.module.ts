import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { UserService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService], // Adicionamos o PrismaService como um provedor para que ele possa ser injetado em outros componentes.
})

export class AppModule {}