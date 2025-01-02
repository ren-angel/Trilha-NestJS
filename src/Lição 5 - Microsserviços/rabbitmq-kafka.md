Implementar microsserviços com **RabbitMQ** e **Kafka** no **NestJS** envolve configurar transportadores para cada plataforma e estabelecer métodos de comunicação adequados. Ambos são sistemas de mensageria, mas têm características diferentes:

- **RabbitMQ**: Baseado em mensagens com suporte a filas e roteamento flexível. É ótimo para padrões RPC e pub/sub.
- **Kafka**: Um sistema de logs distribuídos projetado para alta escala e throughput. Ideal para processamento de eventos em larga escala.

A seguir, abordaremos a implementação com cada ferramenta.

OBS.: Para ambos, é necessário fazer a instalação de seus respectivos softwares (RabbitMQ e Apache Kafka) em sua máquina local ou em um contêiner Docker. Por conveniência, estarei usando o método do Docker.

---

### **Implementando Microsserviços com RabbitMQ**

#### **1. Configuração do RabbitMQ**
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

#### **2. Instale as dependências**
```bash
npm install @nestjs/microservices amqplib
```

#### **3. Configuração do Transportador**
No NestJS, configure o transportador para RabbitMQ usando o módulo de microsserviços.

- **Produtor (Client)**:
  ```typescript
  import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

  @Injectable()
  export class RabbitMQClientService {
    private client: ClientProxy;

    constructor() {
      this.client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      });
    }

    send(pattern: string, data: any) {
      return this.client.send(pattern, data).toPromise();
    }

    emit(pattern: string, data: any) {
      return this.client.emit(pattern, data);
    }
  }
  ```

- **Consumidor (Listener)**:
  ```typescript
  import { Controller } from '@nestjs/common';
  import { MessagePattern, EventPattern } from '@nestjs/microservices';

  @Controller()
  export class RabbitMQConsumerController {
    @MessagePattern('soma')
    handleSoma(data: { a: number; b: number }): number {
      return data.a + data.b;
    }

    @EventPattern('user.created')
    handleUserCreated(data: { userId: string }) {
      console.log(`Usuário criado: ${data.userId}`);
    }
  }
  ```

#### **4. Inicialização do Microserviço**
No arquivo principal (`main.ts`), inicie o serviço como microserviço:

```typescript
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
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
  import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

  @Injectable()
  export class KafkaClientService {
    private client: ClientProxy;

    constructor() {
      this.client = ClientProxyFactory.create({
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'my-consumer-group',
          },
        },
      });
    }

    send(topic: string, data: any) {
      return this.client.send(topic, data).toPromise();
    }

    emit(topic: string, data: any) {
      return this.client.emit(topic, data);
    }
  }
  ```

- **Consumidor (Listener)**:
  ```typescript
  import { Controller } from '@nestjs/common';
  import { MessagePattern, EventPattern } from '@nestjs/microservices';

  @Controller()
  export class KafkaConsumerController {
    @MessagePattern('soma')
    handleSoma(data: { a: number; b: number }): number {
      return data.a + data.b;
    }

    @EventPattern('user.created')
    handleUserCreated(data: { userId: string }) {
      console.log(`Usuário criado: ${data.userId}`);
    }
  }
  ```

#### **4. Inicialização do Microserviço**
No arquivo principal (`main.ts`), configure o Kafka:

```typescript
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'my-consumer-group',
      },
    },
  });
  await app.listen();
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