// Importa o ValidationPipe do NestJS. O ValidationPipe é uma funcionalidade de validação de dados de entrada, muito útil para garantir que as requisições estejam no formato correto antes de serem processadas.
import { ValidationPipe } from '@nestjs/common';

// Importa o NestFactory, que é uma fábrica utilizada para criar a aplicação NestJS.
import { NestFactory } from '@nestjs/core';

// Importa o módulo principal da aplicação, o AppModule.
import { AppModule } from './app.module';

// Função assíncrona que inicializa a aplicação NestJS
async function bootstrap() {

  // Cria a aplicação NestJS, passando o módulo principal (AppModule) como parâmetro.
  const app = await NestFactory.create(AppModule);

  // Adiciona o ValidationPipe globalmente à aplicação.
  // O ValidationPipe automaticamente valida e converte os dados de entrada (como parâmetros de rota, corpo da requisição, etc.).
  // Se os dados não forem válidos, o NestJS automaticamente lança um erro de validação.
  // Utilizado em conjunto com o "class-validator".
  app.useGlobalPipes(new ValidationPipe());

  // Inicializa o servidor da aplicação, fazendo com que ela comece a escutar na porta configurada.
  await app.listen(process.env.PORT ?? 3000);
}

// Chama a função 'bootstrap' para iniciar a aplicação.
bootstrap();
