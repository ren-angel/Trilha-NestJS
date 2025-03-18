### **Testes de Integração no NestJS**

## **1. Testando a Interação entre Módulos e Camadas**

Diferente dos testes unitários (que isolam partes individuais da aplicação), os testes de integração no NestJS validam:
- Se os módulos estão corretamente configurados.  
- Se os serviços comunicam-se corretamente entre si.  
- Se as chamadas ao banco de dados funcionam como esperado.  

### **Criando um Teste de Integração para um Módulo**

Vamos testar um módulo que gerencia alunos.

#### **Passo 1: Criando o Módulo**
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { Aluno } from './aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  providers: [AlunoService],
  controllers: [AlunoController],
})
export class AlunoModule {}
```

#### **Passo 2: Criando um Teste de Integração**
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AlunoModule (integração)', () => {
  let service: AlunoService;
  let controller: AlunoController;
  let repo: Repository<Aluno>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Aluno])],
      controllers: [AlunoController],
      providers: [
        AlunoService,
        {
          provide: getRepositoryToken(Aluno),
          useClass: Repository, // Usa o próprio TypeORM Repository
        },
      ],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
    controller = module.get<AlunoController>(AlunoController);
    repo = module.get<Repository<Aluno>>(getRepositoryToken(Aluno));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
    expect(repo).toBeDefined();
  });

  it('deve criar um aluno', async () => {
    const aluno = new Aluno();
    aluno.nome = 'João Silva';

    jest.spyOn(repo, 'save').mockResolvedValue(aluno);

    const resultado = await service.create(aluno);
    expect(resultado).toEqual(aluno);
  });
});
```

---

## **2. Configuração do Banco de Dados para Testes**

Para testar a integração com o banco de dados, existem duas abordagens:

1️⃣ **Usar um banco real (exemplo: MySQL ou PostgreSQL) com um ambiente de testes isolado.**  
2️⃣ **Usar um banco em memória (exemplo: SQLite ou um banco fake como o `typeorm-memory`).**  

### **Configurando um Banco em Memória com SQLite**

Podemos substituir o MySQL por um banco SQLite em memória para acelerar os testes.

#### **Passo 1: Configurar o Módulo TypeORM no modo Teste**
Crie um arquivo **`typeorm-test.module.ts`** para configurar o banco de testes:

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:', // Banco em memória
    entities: entities,
    synchronize: true, // Cria tabelas automaticamente
  } as TypeOrmModuleOptions);
```

#### **Passo 2: Utilizar essa configuração nos testes**
Agora, nos testes de integração, podemos importar esse módulo:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';
import { TypeOrmTestingModule } from '../typeorm-test.module';

describe('AlunoService (integração)', () => {
  let service: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmTestingModule([Aluno])],
      providers: [AlunoService],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });
});
```

---

### **Alternativa: Configuração de Banco MySQL para Testes**
Se quiser usar um banco MySQL real para testes, crie um banco separado (`test_db`) e configure no `test.env`:

```
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=senha
DB_NAME=test_db
```

E carregue essas variáveis no `TestModule`:

```typescript
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.test' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Aluno],
      synchronize: true,
    }),
  ],
})
export class TestDatabaseModule {}
```