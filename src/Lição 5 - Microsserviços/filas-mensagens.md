Gerenciar filas e mensagens é um dos aspectos mais críticos em sistemas baseados em microsserviços para garantir alta disponibilidade, desempenho e processamento ordenado. No **NestJS**, o gerenciamento de filas e mensagens é simplificado ao usar ferramentas como **RabbitMQ** ou **Kafka**.

A seguir, exploraremos práticas recomendadas e exemplos específicos para gerenciar filas e mensagens.

---

## **Gerenciamento de Filas no RabbitMQ**

### **Configurações Importantes para Gerenciar Filas**

1. **Durabilidade**: 
   - As filas podem ser configuradas para serem duráveis, garantindo que mensagens persistam mesmo se o RabbitMQ reiniciar.
   ```typescript
   queueOptions: { durable: true }
   ```

2. **Confirmação de Mensagens**:
   - Confirme mensagens manualmente para evitar a perda de dados caso o consumidor falhe.
   ```typescript
   @MessagePattern('processar_pedido')
   async handlePedido(data: any, context: RmqContext) {
     const channel = context.getChannelRef();
     const originalMsg = context.getMessage();

     try {
       // Processa a mensagem
       console.log('Pedido processado:', data);

       // Confirma a mensagem
       channel.ack(originalMsg);
     } catch (err) {
       // Rejeita a mensagem para reprocessamento
       channel.nack(originalMsg);
     }
   }
   ```

3. **Prefetch**:
   - Controle quantas mensagens são entregues a cada consumidor para evitar sobrecarregar uma instância.
   ```typescript
   options: { prefetchCount: 5 }
   ```

---

### **Gerenciamento de Dead Letter Queues (DLQ)**

Uma **Dead Letter Queue (DLQ)** é usada para armazenar mensagens que não puderam ser processadas.

- Configuração de DLQ:
  ```typescript
  options: {
    queue: 'main_queue',
    queueOptions: {
      durable: true,
      deadLetterExchange: 'dead_letter_exchange',
      deadLetterRoutingKey: 'dead_letter_key',
    },
  }
  ```

- Consumindo da DLQ:
  ```typescript
  @MessagePattern('dead_letter_key')
  handleDeadLetters(data: any) {
    console.error('Mensagem não processada:', data);
  }
  ```

---

### **Retry com Atraso**

RabbitMQ não suporta nativamente mensagens atrasadas, mas você pode usar um **exchange de atraso** para reprocessar mensagens.

- Criar uma fila com atraso:
  ```typescript
  queueOptions: {
    durable: true,
    arguments: {
      'x-dead-letter-exchange': 'retry_exchange',
      'x-message-ttl': 60000, // 60 segundos de atraso
    },
  }
  ```

---

## **Gerenciamento de Mensagens no Kafka**

### **Commit de Offsets Manual**

Por padrão, o Kafka consome mensagens automaticamente, mas você pode gerenciar manualmente os offsets para garantir que apenas mensagens processadas sejam consideradas como lidas.

**Offsets:** Um marcador que indica até qual mensagem um consumidor leu em uma fila de mensagens. Ele ajuda o sistema a saber qual é a próxima mensagem a ser processada, para que o consumidor não perca nem leia a mesma mensagem mais de uma vez.

- Consumidor Kafka com commit manual:
  ```typescript
  @MessagePattern('processar_pedido')
  async handlePedido(data: any, context: KafkaContext) {
    const consumer = context.getConsumer();
    const message = context.getMessage();

    try {
      console.log('Processando pedido:', data);

      // Confirma o processamento
      await consumer.commitOffsets([
        { topic: message.topic, partition: message.partition, offset: (parseInt(message.offset) + 1).toString() },
      ]);
    } catch (err) {
      console.error('Erro ao processar pedido:', err);
    }
  }
  ```

---

### **Particionamento e Balanceamento de Carga**

- Kafka permite particionar tópicos para distribuir a carga entre vários consumidores. Ao configurar partições:

**Tópicos:** Essencialmente, a caixas de correio do Kafka, categorizada por tipo de mensagens, como `pedidos de pizza`, `pedidos de hambúrguer`, etc.
**Partições:** Assim como as partições de um HD, aqui particionar um tópico é dividi-lo em "caixas" menoras para aumentar eficiência.

  - **Particionamento**:
    Configure ao criar o tópico:
    ```bash
    kafka-topics --create --topic processar_pedido --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092
    ```

Com isso, podemos dividir o trabalho entre consumidores num mesmo grupo. Quando um grupo de consumidores está configurado para ler de um tópico, eles dividem o trabalho. Se o tópico tem várias partições, cada consumidor pode ficar responsável por ler uma ou mais dessas partições. Isso significa que se um consumidor ficar sobrecarregado ou falhar, os outros consumidores do grupo podem continuar o trabalho.

  - **Consumidor com grupo**:
    Consumidores em um grupo automaticamente compartilham mensagens entre si:
    ```typescript
    consumer: {
      groupId: 'grupo-consumidores',
    }
    ```

---

### **Retry com Tópicos de Retransmissão**

Se uma mensagem falhar, você pode movê-la para um **tópico de retransmissão** com atraso.

- Produzindo para o tópico de retransmissão:
  ```typescript
  if (processamentoFalhou) {
    client.emit('retransmissao_pedido', { ...data, tentativa: data.tentativa + 1 });
  }
  ```

- Consumidor do tópico de retransmissão:
  ```typescript
  @MessagePattern('retransmissao_pedido')
  async handleRetransmissao(data: any) {
    console.log('Tentativa de reprocessamento:', data.tentativa);
  }
  ```

---

## **Práticas Recomendadas para Gerenciamento de Filas e Mensagens**

1. **Garantir Idempotência**:
   - Mensagens podem ser processadas mais de uma vez. Certifique-se de que o processamento seja idempotente.

2. **Monitoramento e Logs**:
   - Use ferramentas como Prometheus e Grafana para monitorar o status de filas, mensagens processadas e taxas de erro.

3. **Política de Retry e DLQ**:
   - Configure políticas claras de retry para evitar perder mensagens importantes.

4. **Escalabilidade**:
   - Para filas muito movimentadas, use particionamento (Kafka) ou múltiplos consumidores (RabbitMQ) para balancear a carga.

5. **Segurança**:
   - Configure autenticação e autorização para evitar acessos não autorizados às filas e tópicos.