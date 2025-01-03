import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';

@Module({
  imports: [
    // Registrando o módulo de Clientes para comunicação com microserviços
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE', // Nome do cliente para identificar o serviço
        transport: Transport.RMQ, // Usando RabbitMQ como transporte
        options: {
          urls: ['amqp://localhost:5672'], // URL de conexão com o servidor RabbitMQ
          queue: 'notifications_queue', // Nome da fila que o serviço utilizará
          queueOptions: { durable: true }, // Configuração para a fila persistir entre reinicializações
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class AppModule {}