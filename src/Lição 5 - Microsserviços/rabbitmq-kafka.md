Implementar microsserviços com **RabbitMQ** e **Kafka** no **NestJS** envolve configurar transportadores para cada plataforma e estabelecer métodos de comunicação adequados. Ambos são sistemas de mensageria, mas têm características diferentes:

- **RabbitMQ**: Baseado em mensagens com suporte a filas e roteamento flexível. É ótimo para padrões RPC e pub/sub.
- **Kafka**: Um sistema de logs distribuídos projetado para alta escala e throughput. Ideal para processamento de eventos em larga escala.

---

Há muitos termos inéditos aqui, então irei fazer um glossário para cada um deles:

- **Mensagens**:
   - São pedaços de dados enviados de um sistema para outro.
   - Elas contêm informações (como comandos, notificações ou dados) que um sistema precisa processar.
   - Exemplos:
     - Uma mensagem pode conter: "Pedido #123 foi criado".
     - Outra mensagem pode ser: "Atualizar o estoque do produto X".

2. **Filas**:
   - Uma fila é como uma linha de espera onde as mensagens ficam armazenadas até serem processadas.
   - Pense em uma fila no banco: as pessoas entram na fila, esperam sua vez, e são atendidas uma por vez.
   - No contexto de sistemas, as filas garantem que as mensagens sejam processadas na ordem em que chegaram.
   - Após serem processadas, elas são removidas.

3. **O que é roteamento?**
   - É decidir para onde enviar uma mensagem.
   - Com RabbitMQ, você pode configurar **regras de roteamento** para determinar qual fila receberá cada mensagem.

4. **Por que é "flexível"?**
   - Você pode definir critérios personalizados para o roteamento.
   - Exemplo:
     - Mensagens sobre pedidos vão para a fila `pedidos`.
     - Mensagens sobre pagamentos vão para a fila `pagamentos`.

5. **O que é um log distribuído?**
   - Um **log** aqui não é apenas um registro de eventos como em arquivos de log. É uma estrutura onde todas as mensagens recebidas são armazenadas em sequência.
   - Essas mensagens podem ser lidas por diferentes sistemas a qualquer momento.
   - Exemplo:
     - O Kafka recebe mensagens sobre "vendas realizadas".
     - Um sistema pode ler essas mensagens para atualizar o estoque.
     - Outro sistema pode ler as mesmas mensagens para gerar relatórios financeiros.
   - Um **sistema distribuído** significa que essa estrutura é dividida em várias máquinas, o que permite lidar com grandes volumes de dados.

6. **O que é throughput?**
   - É a quantidade de mensagens que um sistema pode processar por segundo.
   - Alta capacidade de throughput significa que o sistema consegue lidar com muitas mensagens ao mesmo tempo sem ficar lento.

Pense no RabbitMQ como um **correio organizado** e Kafka como uma **central de distribuição de dados**.

---

A seguir, abordaremos a implementação com cada ferramenta.

OBS.: Para ambos, é necessário fazer a instalação de seus respectivos softwares (RabbitMQ e Apache Kafka) em sua máquina local ou em um contêiner Docker. Por conveniência, estarei usando o método do Docker.

### **Implementando Microsserviços com RabbitMQ**

#### **1. Configuração do RabbitMQ**
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

#### **2. Instale as dependências**
```bash
npm install @nestjs/microservices amqplib amqp-connection-manager
```

#### **3. Configuração do Transportador**
No NestJS, configure o transportador para RabbitMQ usando o módulo de microsserviços.

- **Produtor (Client)**:
  ```typescript
  import { Module } from '@nestjs/common';
  import { ClientsModule, Transport } from '@nestjs/microservices';
  import { NotificationService } from './notification/notification.service';
  import { NotificationController } from './notification/notification.controller';

  @Module({
    imports: [
      ClientsModule.register([
        {
          name: 'NOTIFICATION_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'notifications_queue',
            queueOptions: { durable: true },
          },
        },
      ]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
  })
  export class AppModule {}
  ```

- **Service**:
  ```typescript
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class NotificationService {
    processNotification(message: any): void {
      console.log('Processing notification:', message);
      console.log(`Sending email to ${message.to} with content: ${message.content}`);
    }
  }
  ```

- **Consumidor (Listener)**:
  ```typescript
  import { Controller } from '@nestjs/common';
  import { EventPattern, Payload } from '@nestjs/microservices';
  import { NotificationService } from './notification.service';

  @Controller()
  export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern('notifications')
    handleNotification(@Payload() data: any) {
      console.log('Received notification:', data);
      this.notificationService.processNotification(data);
    }
  }
  ```

#### **4. Inicialização do Microserviço**
No arquivo principal (`main.ts`), inicie o serviço como microserviço:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notifications_queue',
      queueOptions: { durable: true },
    },
  });

  await app.listen();
  console.log('Notification Microservice is running');
}
bootstrap();
```

---

### **Implementando Microsserviços com Kafka**

#### **1. Configuração do Kafka**
```yaml
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_LISTENERS: PLAINTEXT://:9092
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    ports:
      - "9092:9092"
```

Inicie o ambiente com:
```bash
docker-compose up -d
```

#### **2. Instale as dependências**
```bash
npm install @nestjs/microservices kafkajs
```

#### **3. Configuração do Transportador**
- **Produtor (Client)**:
  ```typescript
  import { Module } from '@nestjs/common';
  import { ClientsModule, Transport } from '@nestjs/microservices';
  import { NotificationService } from './notification/notification.service';
  import { NotificationController } from './notification/notification.controller';

  @Module({
    imports: [
      ClientsModule.register([
        {
          name: 'NOTIFICATION_SERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: ['localhost:9092'],
            },
            consumer: {
              groupId: 'notification-consumer',
            },
          },
        },
      ]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
  })
  export class AppModule {}
  ```

- **Service**:
  ```typescript
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class NotificationService {
    processNotification(message: any): void {
      console.log('Processing notification:', message);
      console.log(`Sending email to ${message.to} with content: ${message.content}`);
    }
  }
  ```

- **Consumidor (Listener)**:
  ```typescript
  import { Controller } from '@nestjs/common';
  import { EventPattern, Payload } from '@nestjs/microservices';
  import { NotificationService } from './notification.service';

  @Controller()
  export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern('notifications')
    handleNotification(@Payload() data: any) {
      const message = data?.value ? JSON.parse(data.value) : data;
      console.log('Received notification:', message);
      this.notificationService.processNotification(message);
    }
  }
  ```

#### **4. Inicialização do Microserviço**
No arquivo principal (`main.ts`), configure o Kafka:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
      },
    },
  });

  await app.listen();
  console.log('Notification Microservice is running');
}
bootstrap();
```

---

### **Comparação entre RabbitMQ e Kafka no NestJS**

| Aspecto                  | RabbitMQ                         | Kafka                          |
|--------------------------|----------------------------------|--------------------------------|
| Tipo de Mensageria       | Baseado em filas                | Log distribuído               |
| Padrões Suportados       | RPC, Pub/Sub                    | Pub/Sub                       |
| Escalabilidade           | Moderada                        | Alta                          |
| Persistência de Mensagens| Opcional                        | Sempre persistente            |
| Caso de Uso Ideal        | Sistemas com comunicação direta | Processamento de eventos em larga escala |