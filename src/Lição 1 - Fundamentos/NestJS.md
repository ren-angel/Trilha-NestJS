## **O que é NestJS?**  
NestJS é um framework para construção de aplicações server-side em Node.js. Ele utiliza TypeScript por padrão e é fortemente inspirado no Angular, o que traz uma arquitetura modular e baseada em decoradores. O NestJS é voltado para a criação de aplicações escaláveis e mantidas por uma estrutura bem definida.

---

## **Diferenças entre NestJS e Express.js**  

| Aspecto                     | NestJS                                | Express.js                  |
|-----------------------------|----------------------------------------|-----------------------------|
| **Arquitetura**              | Baseado em módulos, decoradores e classes. | Simples e minimalista.     |
| **Complexidade**             | Mais complexo, mas mais organizado.  | Simples e direto ao ponto. |
| **Padrão de Projeto**        | MVC e Injeção de Dependência.         | Livre, sem estrutura definida. |
| **Suporte a TypeScript**     | Nativo.                              | Necessário configurar.     |
| **Flexibilidade**            | Menos flexível devido à sua estrutura rígida. | Muito flexível.            |
| **Uso Comum**                | Aplicações grandes e corporativas.   | Aplicações simples e APIs REST. |
| **Suporte Integrado**        | Suporte nativo a WebSockets, GraphQL, microservices. | Requer bibliotecas externas. |

NestJS utiliza o Express.js (ou Fastify) como servidor HTTP subjacente, oferecendo uma abstração mais rica e organizada.

---

## **Inversão de Controle (IoC) e Injeção de Dependência (DI)**  

### **Inversão de Controle (IoC)**  

A **Inversão de Controle (IoC)** é um princípio de design onde a responsabilidade de gerenciar a criação e o ciclo de vida de objetos e suas dependências é delegada a um framework ou contêiner. Em vez de o código principal instanciar diretamente seus componentes, o contêiner IoC faz isso, seguindo regras e configurações fornecidas pelo desenvolvedor.

#### **Como a IoC Funciona?**
- **Contêiner IoC:** Uma entidade que controla a criação e gerenciamento de objetos.
- **Registros:** Os desenvolvedores registram dependências e suas relações no contêiner.
- **Resolução Automática:** O contêiner cria objetos conforme necessário e injeta suas dependências automaticamente.

#### **Exemplo Simples (Sem IoC)**
```typescript
class Service {
  getData() {
    return "Data from Service";
  }
}

class Controller {
  private service: Service;

  constructor() {
    this.service = new Service();  // Dependência gerenciada manualmente
  }

  get() {
    return this.service.getData();
  }
}
```
Aqui, `Controller` depende de `Service` e o cria manualmente. Isso viola o princípio de IoC.

---

#### **Com IoC (NestJS)**
```typescript
@Injectable()
class Service {
  getData() {
    return "Data from Service";
  }
}

@Controller()
class Controller {
  constructor(private readonly service: Service) {}  // Dependência injetada
  get() {
    return this.service.getData();
  }
}
```
Aqui, o contêiner IoC do NestJS gerencia automaticamente a criação e injeção de `Service` em `Controller`.

---

### **Injeção de Dependência (DI)**  

**Injeção de Dependência (DI)** é uma técnica para fornecer dependências externas a um objeto sem que ele precise criá-las por conta própria. A DI permite modularidade, testes mais fáceis e menor acoplamento entre classes.

#### **Tipos de Injeção de Dependência:**
1. **Construtor:** A dependência é passada via construtor. (Mais comum)
2. **Método:** A dependência é passada via método.
3. **Propriedade:** A dependência é injetada diretamente em uma propriedade.

---

#### **Como a DI Funciona em NestJS**
1. **Registro de Dependências:** Classes e serviços são marcados com o decorador `@Injectable()`.
2. **Injeção Automática:** O contêiner IoC do NestJS injeta essas dependências sempre que necessário.

---

#### **Exemplo de DI em NestJS**
```typescript
@Injectable()
class DatabaseService {
  connect() {
    console.log("Connected to database");
  }
}

@Injectable()
class UserService {
  constructor(private readonly dbService: DatabaseService) {}

  getUser() {
    this.dbService.connect();  // Dependência já injetada
    return { name: "John Doe" };
  }
}
```

**Explicação:**  
- `DatabaseService` está registrado no contêiner IoC por causa do decorador `@Injectable()`.
- `UserService` recebe automaticamente a instância de `DatabaseService` através do seu construtor.