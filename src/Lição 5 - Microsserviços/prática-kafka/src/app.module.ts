import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';

@Module({
  imports: [
    // Registrando o módulo de Clientes para comunicação com microserviços
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE', // Nome do cliente para identificar o serviço Kafka
        transport: Transport.KAFKA, // Usando Kafka como transporte
        options: {
          client: {
            brokers: ['localhost:9092'], // Endereços dos brokers Kafka (Broker é o componente responsável por armazenar e gerenciar as mensagens enviadas para o Kafka)
          },
          consumer: {
            groupId: 'notification-consumer', // Grupo de consumidores Kafka para garantir balanceamento
          },
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})

export class AppModule {}