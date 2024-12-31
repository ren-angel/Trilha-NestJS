## Revisão DDD e Clean Architecture - Versão NestJS

### **1. Entendendo as camadas e responsabilidades**
#### **Domínio (Domain)**
- Contém a lógica de negócio pura e entidades.
- Independente de frameworks ou detalhes de infraestrutura.
- Componentes típicos:
  - **Entidades**: Representam o modelo de negócio, com comportamento encapsulado.
  - **Objetos de Valor**: Representam conceitos imutáveis (ex.: CPF, Email).
  - **Regras de Negócio**: Implementadas diretamente nas entidades ou em serviços de domínio.
  - **Interfaces de Repositórios**: Apenas contratos para persistência de dados.

#### **Aplicação (Application)**
- Gerencia casos de uso do sistema.
- Coordena a execução da lógica de negócio no domínio e delega tarefas para as camadas externas.
- Componentes típicos:
  - **Casos de Uso (Use Cases)**: Orquestram as operações do domínio.
  - **Serviços de Aplicação**: Chamam os repositórios ou APIs externas.
  - **DTOs**: Definem os dados de entrada e saída.

#### **Infraestrutura (Infrastructure)**
- Fornece implementações concretas para as dependências do domínio e aplicação.
- Componentes típicos:
  - **Repositórios**: Implementações concretas dos contratos do domínio.
  - **Provedores de Serviços Externos**: Integração com APIs, filas, etc.
  - **Banco de Dados**: Mapeamento ORM (ex.: TypeORM, Prisma).

---

### **2. Estrutura do Projeto**
A estrutura típica do projeto NestJS seguindo DDD e Clean Architecture pode ser:

```plaintext
src/
├── domain/
│   ├── entities/
│   │   ├── user.entity.ts
│   │   └── order.entity.ts
│   ├── value-objects/
│   │   ├── email.vo.ts
│   │   └── cpf.vo.ts
│   ├── repositories/
│   │   ├── user-repository.interface.ts
│   │   └── order-repository.interface.ts
│   └── services/
│       └── payment-domain-service.ts
├── application/
│   ├── use-cases/
│   │   ├── create-user.usecase.ts
│   │   └── place-order.usecase.ts
│   ├── dtos/
│   │   ├── create-user.dto.ts
│   │   └── place-order.dto.ts
│   └── interfaces/
│       ├── user-service.interface.ts
│       └── payment-service.interface.ts
├── infrastructure/
│   ├── database/
│   │   ├── typeorm/
│   │   │   ├── user.repository.ts
│   │   │   └── order.repository.ts
│   ├── providers/
│   │   ├── email-provider.ts
│   │   └── payment-provider.ts
│   ├── config/
│   │   └── database.config.ts
│   └── http/
│       ├── controllers/
│       │   ├── user.controller.ts
│       │   └── order.controller.ts
│       └── modules/
│           ├── user.module.ts
│           └── order.module.ts
├── common/
│   ├── middlewares/
│   │   └── logger.middleware.ts
│   ├── filters/
│   │   └── exception.filter.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   └── interceptors/
│       └── logging.interceptor.ts
└── main.ts
```

---

### **3. Passo a Passo de Implementação**

#### **1. Criar a Entidade no Domínio**
```typescript
// domain/entities/user.entity.ts
export class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
  ) {}

  changeEmail(newEmail: string): void {
    // Lógica de negócio para mudar o e-mail
    this.email = newEmail;
  }
}
```

#### **2. Definir o Caso de Uso**
```typescript
// application/use-cases/create-user.usecase.ts
import { UserRepository } from '../../domain/repositories/user-repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserDto): Promise<void> {
    const user = new User(input.id, input.name, input.email);
    await this.userRepository.save(user);
  }
}
```

#### **3. Implementar o Repositório**
```typescript
// infrastructure/database/typeorm/user.repository.ts
import { UserRepository } from '../../../domain/repositories/user-repository.interface';
import { User } from '../../../domain/entities/user.entity';

export class TypeOrmUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    // Implementação concreta usando TypeORM
  }

  async findById(id: string): Promise<User | null> {
    // Implementação concreta usando TypeORM
  }
}
```

#### **4. Configurar a Injeção de Dependência**
```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { TypeOrmUserRepository } from './infrastructure/database/typeorm/user.repository';

@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'CreateUserUseCase',
      useFactory: (userRepository) => new CreateUserUseCase(userRepository),
      inject: ['UserRepository'],
    },
  ],
})
export class AppModule {}
```

#### **5. Criar o Controller**
```typescript
// infrastructure/http/controllers/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.createUserUseCase.execute(createUserDto);
  }
}
```