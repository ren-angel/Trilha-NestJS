import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  // Criando o microserviço baseado no AppModule
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA, // Configurando Kafka como transporte
    options: {
      client: {
        brokers: ['localhost:9092'], // Endereços dos brokers Kafka
      },
      consumer: {
        groupId: 'notification-consumer', // Grupo de consumidores para balanceamento e persistência
      },
    },
  });

  await app.listen(); // Inicializa o microserviço e começa a escutar eventos
  console.log('Microserviço de notificação rodando'); // Log indicando que o serviço está ativo
}

bootstrap();