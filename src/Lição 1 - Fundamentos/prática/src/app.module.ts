import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// O decorator '@Module' define o módulo 'AppModule', que organiza os controladores, serviços e outros módulos que fazem parte da aplicação.
@Module({

  // O 'imports' define quais módulos são importados e podem ser usados dentro deste módulo.
  // Aqui, o UsersModule é importado, o que significa que este módulo pode acessar todas as funcionalidades do UsersModule.
  imports: [UsersModule],
  controllers: [AppController],  // Define o controlador principal da aplicação (geralmente usado para configurar rotas globais).
  providers: [AppService],  // Define o serviço principal da aplicação (geralmente usado para regras de negócios globais).
})

// A classe AppModule é o módulo principal da aplicação, que agrega o comportamento da aplicação e define os módulos, controladores e provedores.
export class AppModule {}
