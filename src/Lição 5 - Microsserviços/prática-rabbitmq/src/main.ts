import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  // Criando o microserviço baseado no módulo principal (AppModule)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ, // Especifica o transporte como RabbitMQ
    options: {
      urls: ['amqp://localhost:5672'], // URL de conexão com o RabbitMQ
      queue: 'notifications_queue', // Nome da fila utilizada pelo microserviço
      queueOptions: { durable: true }, // Configuração para que a fila seja persistente
    },
  });

  await app.listen(); // Inicializa o microserviço e começa a escutar eventos
  console.log('Microserviço de notificação rodando'); // Log informando que o serviço está ativo
}

bootstrap();