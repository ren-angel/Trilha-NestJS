// Importa o decorator '@Module' do NestJS.
import { Module } from '@nestjs/common';

// Importa o serviço que contém a lógica de negócios relacionada aos usuários.
import { UsersService } from './users.service';

// Importa o controlador que lida com as requisições HTTP relacionadas aos usuários.
import { UsersController } from './users.controller';

// O decorator '@Module' é utilizado para definir um módulo no NestJS. Módulos organizam e agrupam a aplicação em unidades lógicas.
@Module({

  // Define os controladores que fazem parte deste módulo.
  controllers: [UsersController],

  // Define os provedores (serviços, por exemplo) que são injetados nas dependências.
  providers: [UsersService],
})

// Define a classe 'UsersModule', que representa o módulo responsável pelas operações relacionadas aos usuários.
export class UsersModule {}
