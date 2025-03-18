### **Testes End-to-End (E2E) no NestJS**

## **1. Criando Cenários para Simular o Fluxo Completo**

Diferente dos testes unitários e de integração, os testes E2E testam a aplicação de ponta a ponta, incluindo:
- Chamadas à API via HTTP.  
- Banco de dados real ou em memória.  
- Middleware, Guards, Interceptors e Pipes.  

### **Exemplo de Teste E2E para um CRUD de Alunos**

#### **Passo 1: Criando o Arquivo de Teste**
Os testes E2E geralmente ficam na pasta `test/` no NestJS.  
Crie o arquivo: **`test/aluno.e2e-spec.ts`**.

#### **Passo 2: Configurar o Módulo de Teste**
Utilizamos o `supertest` para simular chamadas HTTP.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AlunoController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve criar um aluno', async () => {
    const aluno = { nome: 'João Silva', idade: 20 };

    const resposta = await request(app.getHttpServer())
      .post('/alunos')
      .send(aluno)
      .expect(201);

    expect(resposta.body).toMatchObject(aluno);
  });

  it('deve listar alunos', async () => {
    const resposta = await request(app.getHttpServer()).get('/alunos').expect(200);
    expect(Array.isArray(resposta.body)).toBeTruthy();
  });

  it('deve retornar erro ao criar um aluno sem nome', async () => {
    await request(app.getHttpServer())
      .post('/alunos')
      .send({ idade: 20 })
      .expect(400);
  });
});
```

---

## **2. Testando APIs e Validações**

Os testes E2E garantem que as validações da API funcionam corretamente.

### **Validações com `class-validator` e `class-transformer`**
Se tivermos um DTO com validações:

```typescript
import { IsString, IsInt, Min } from 'class-validator';

export class CriarAlunoDto {
  @IsString()
  nome: string;

  @IsInt()
  @Min(1)
  idade: number;
}
```

Podemos testar se a API rejeita entradas inválidas:

```typescript
it('deve retornar erro ao enviar idade negativa', async () => {
  await request(app.getHttpServer())
    .post('/alunos')
    .send({ nome: 'João', idade: -5 })
    .expect(400);
});
```