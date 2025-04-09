### **Desafio Prático: Desenvolvendo uma Plataforma de Gerenciamento de Eventos com NestJS**

# [Link](https://github.com/ren-angel/Events-Manager-System) do repo do desafio

#### **Descrição do Desafio**  
Você será responsável por desenvolver uma plataforma para gerenciar eventos corporativos. O sistema deve permitir que administradores criem eventos, gerenciem participantes e visualizem relatórios de participação. Além disso, deve integrar-se a microsserviços para notificações e relatórios, garantindo uma arquitetura escalável e moderna.

---

#### **Requisitos Funcionais**  

1. **Gestão de Eventos**:  
   - Criar, editar, listar e excluir eventos.  
   - Cada evento deve conter: título, descrição, data, horário, local, capacidade máxima de participantes.  

2. **Gestão de Participantes**:  
   - Permitir o cadastro, edição e exclusão de participantes.  
   - Um participante pode se inscrever em vários eventos, respeitando a capacidade máxima de cada evento.  

3. **Autenticação e Autorização**:  
   - Implementar autenticação com JWT.  
   - Apenas administradores podem gerenciar eventos e participantes.  
   - Participantes podem visualizar a lista de eventos e se inscrever.

4. **Relatórios**:  
   - Gerar relatórios de eventos com a lista de participantes em formato JSON e enviar por e-mail (simulação de envio).  

5. **Microsserviços**:  
   - **Notificações**: Enviar notificações por e-mail (simuladas) quando um participante se inscrever em um evento.  
   - **Relatórios**: Criar um microsserviço para geração e armazenamento dos relatórios.

---

#### **Requisitos Técnicos**  

1. **Banco de Dados**:  
   - Utilize TypeORM ou Prisma para gerenciar o banco de dados.  
   - Crie entidades para `Evento` e `Participante`, com relacionamento N:N entre elas.  

2. **Middleware, Guards e Interceptors**:  
   - Middleware para logar todas as requisições.  
   - Guards para autenticação e autorização.  
   - Interceptor para manipular respostas e tratar erros.  

3. **Arquitetura**:  
   - Siga princípios de Clean Architecture ou Domain-Driven Design.  
   - Organize o projeto em camadas claras (Domínio, Aplicação, Infraestrutura).  

4. **Microsserviços**:  
   - Configure microsserviços com RabbitMQ para comunicação entre o serviço principal e os microsserviços de Notificações e Relatórios.  

5. **Deploy e Performance**:  
   - Configure o projeto para rodar em contêineres Docker.  
   - Utilize Redis para cache de dados frequentemente acessados, como a lista de eventos.  
   - Configure um pipeline de CI/CD com GitHub Actions.

6. **Testes**:  
   - Escreva testes unitários para serviços e controladores.  
   - Escreva testes de integração para verificar a interação entre módulos.  
   - Crie testes E2E para validar o fluxo completo, como a inscrição de um participante em um evento.

#### **Bônus (Desafios Extras)**  
- Implementar notificações em tempo real usando WebSockets.  
- Adicionar monitoramento com Prometheus e Grafana para exibir métricas de performance.  
- Implementar fila de mensagens para limitar a quantidade de participantes por evento de forma segura.
- README + Documentação do projeto no Swagger
