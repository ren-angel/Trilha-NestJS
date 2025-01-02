### O que são Microsserviços?

Microsserviços são uma abordagem arquitetural em que uma aplicação é dividida em pequenos serviços independentes, cada um focado em resolver um problema específico. Esses serviços são autônomos, têm seus próprios bancos de dados e são implementados, implantados e escalados separadamente.

---

### Quando e por que usar Microsserviços?

#### **Quando usar:**
1. **Escalabilidade Independente:**
   - Quando diferentes partes da aplicação possuem necessidades de escalabilidade distintas. Por exemplo, um serviço de pagamento pode exigir mais recursos que um serviço de notificação.

2. **Alta Complexidade:**
   - Em sistemas grandes e complexos, dividir a aplicação em serviços menores e mais gerenciáveis torna o desenvolvimento e a manutenção mais simples.

3. **Equipe Distribuída:**
   - Quando equipes diferentes trabalham em partes diferentes do sistema. Isso permite autonomia no desenvolvimento e implantação de cada serviço.

4. **Tolerância a falhas:**
   - O sistema geral continua operando mesmo que um serviço falhe.

5. **Heterogeneidade tecnológica:**
   - Quando há necessidade de utilizar diferentes linguagens ou tecnologias para partes distintas da aplicação.

#### **Por que usar:**
1. **Isolamento de Falhas:**
   - Um problema em um microsserviço não afeta diretamente outros serviços.

2. **Ciclo de entrega contínuo:**
   - Serviços podem ser atualizados sem necessidade de implantar todo o sistema.

3. **Reutilização de Código:**
   - Microsserviços podem ser reutilizados em diferentes partes do sistema ou mesmo em outros sistemas.

4. **Melhor uso de recursos:**
   - Cada serviço pode ser escalado conforme sua carga.

5. **Melhor Suporte a DevOps:**
   - Facilita a adoção de práticas como CI/CD, permitindo integração e entrega contínuas.

---

### Comunicação entre Microsserviços no NestJS

A comunicação entre microsserviços no NestJS pode ser feita por **RPC (Remote Procedure Call)** ou **eventos assíncronos**, dependendo do caso de uso. Ambos os métodos são implementados usando **transportadores** que o NestJS suporta nativamente, como Redis, MQTT, Kafka, RabbitMQ, gRPC, etc.

#### **RPC (Remote Procedure Call):**
- **Como funciona:** 
  - Comunicação síncrona entre serviços, onde um serviço faz uma chamada e espera a resposta.
  - Implementado geralmente usando protocolos como **gRPC**, **TCP**, ou **HTTP**.
  
- **Quando usar?**
  - Quando é necessário um feedback imediato do serviço chamado.
  - Em fluxos que dependem de resposta direta para continuar o processamento.

  - **Vantagens:**
  - Simples de implementar.
  - Adequado para operações que precisam de resposta imediata.

- **Desvantagens:**
  - Cria dependência temporal, já que o cliente precisa esperar pela resposta.
  - Pode gerar uma restrição de seu desempenho em sistemas de alta carga.

- **Como implementar no NestJS?**
  Use o decorador `@MessagePattern()` no serviço e um cliente configurado para enviar mensagens. Exemplo:
  ```typescript
  // Serviço
  @MessagePattern({ cmd: 'soma' })
  soma(data: { a: number; b: number }): number {
    return data.a + data.b;
  }

  // Cliente
  const response = await client.send({ cmd: 'soma' }, { a: 5, b: 3 }).toPromise();
  console.log(response); // Output: 8
  ```

#### **Comunicação por Eventos (Event-Driven):**
- **Como funciona:**
  - Comunicação assíncrona baseada em publicação (evento) e assinatura (publish/subscribe, ou simplesmente pub/sub), onde os serviços publicam eventos que são consumidos por outros serviços interessados.
  - Implementado com ferramentas como **Redis**, **RabbitMQ**, ou **Kafka**.

- **Quando usar?**
  - Para comunicação desacoplada.
  - Em cenários onde não há necessidade de resposta imediata.
  - Para lidar com eventos que podem desencadear ações em vários serviços (ex.: notificação, logging).

  - **Vantagens:**
  - Alta desacoplagem entre serviços.
  - Melhor tolerância a falhas, pois os eventos podem ser armazenados até serem processados.

- **Desvantagens:**
  - Maior complexidade no gerenciamento de eventos.
  - Dificuldade em garantir a ordem e entrega de mensagens em alguns casos.
  
- **Como implementar no NestJS?**
  Use o decorador `@EventPattern()` no serviço e um cliente para publicar eventos. Exemplo:
  ```typescript
  // Serviço
  @EventPattern('user.created')
  handleUserCreated(data: { userId: string }) {
    console.log(`Novo usuário criado: ${data.userId}`);
  }

  // Cliente
  client.emit('user.created', { userId: '1234' });
  ```

---

### Diferenças entre RPC e Eventos:

| **Critério**                 | **RPC**                      | **Eventos**                   |
|------------------------------|------------------------------|-------------------------------|
| **Tempo de Resposta**        | Síncrona                     | Assíncrona                    |
| **Dependência de Resposta**  | Sim                          | Não                           |
| **Acoplamento**              | Maior                        | Menor                         |
| **Complexidade**             | Menor                        | Maior                         |
| **Tolerância a Falhas**      | Menor                        | Maior                         |

- Use **RPC** para chamadas onde o serviço precisa de uma resposta imediata (e.g., autenticação).
- Use **Eventos** para operações que podem ser processadas de forma assíncrona (e.g., envio de notificações).

---

Com o NestJS, podemos facilmente adotar ambas as abordagens e até mesmo combiná-las para atender às necessidades do sistema.