### Testes Unitários no NestJS

O NestJS usa o **Jest** como framework de testes por padrão.

---

### 1. Testando Serviços e Controladores Isoladamente

No NestJS, os serviços e controladores são testados separadamente para garantir que cada um funcione corretamente sem depender de outras partes do sistema.

#### **Testando um Serviço**
- Criamos um teste unitário para um serviço simulando suas dependências.
- Exemplo de um serviço simples:

  ```typescript
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class AlunoService {
    getAlunos() {
      return ['João', 'Maria', 'Carlos'];
    }
  }
  ```

- Testando este serviço:

  ```typescript
  import { Test, TestingModule } from '@nestjs/testing';
  import { AlunoService } from './aluno.service';

  describe('AlunoService', () => {
    let service: AlunoService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [AlunoService],
      }).compile();

      service = module.get<AlunoService>(AlunoService);
    });

    it('deve retornar a lista de alunos', () => {
      expect(service.getAlunos()).toEqual(['João', 'Maria', 'Carlos']);
    });
  });
  ```

#### **Testando um Controlador**
- O controlador geralmente depende de um serviço, então utilizamos mocks para simular o serviço.
- Exemplo de controlador:

  ```typescript
  import { Controller, Get } from '@nestjs/common';
  import { AlunoService } from './aluno.service';

  @Controller('alunos')
  export class AlunoController {
    constructor(private readonly alunoService: AlunoService) {}

    @Get()
    getAlunos() {
      return this.alunoService.getAlunos();
    }
  }
  ```

- Testando o controlador com mock:

  ```typescript
  import { Test, TestingModule } from '@nestjs/testing';
  import { AlunoController } from './aluno.controller';
  import { AlunoService } from './aluno.service';

  describe('AlunoController', () => {
    let controller: AlunoController;
    let service: AlunoService;

    beforeEach(async () => {
      const mockService = {
        getAlunos: jest.fn().mockReturnValue(['João', 'Maria', 'Carlos']),
      };

      const module: TestingModule = await Test.createTestingModule({
        controllers: [AlunoController],
        providers: [{ provide: AlunoService, useValue: mockService }],
      }).compile();

      controller = module.get<AlunoController>(AlunoController);
      service = module.get<AlunoService>(AlunoService);
    });

    it('deve retornar a lista de alunos', () => {
      expect(controller.getAlunos()).toEqual(['João', 'Maria', 'Carlos']);
      expect(service.getAlunos).toHaveBeenCalled(); // Verifica se foi chamado
    });
  });
  ```

---

### 2. Uso de Mocks e Stubs para Dependências Externas

Dependências externas, como bancos de dados e APIs, não devem ser chamadas diretamente nos testes unitários. Para isso, usamos **mocks** e **stubs**.

#### **Mocks com Jest**
- Um **mock** simula um comportamento real de uma função ou serviço.
- Exemplo de mock para um serviço:

  ```typescript
  const mockAlunoService = {
    getAlunos: jest.fn().mockReturnValue(['João', 'Maria']),
  };
  ```

- Podemos criar **spies** para verificar chamadas:
  ```typescript
  expect(mockAlunoService.getAlunos).toHaveBeenCalled();
  ```

#### **Stubs**
- Um **stub** é semelhante a um mock, mas com comportamento fixo e sem lógica interna.
- Exemplo:
  ```typescript
  const stubAlunoService = {
    getAlunos: () => ['João', 'Maria'],
  };
  ```

- A diferença entre mocks e stubs é que os **mocks registram interações e chamadas**, enquanto os **stubs apenas fornecem valores fixos**.

---

### 3. Cobertura de Testes: Como Medir e Melhorar

#### **Medindo Cobertura**
O Jest possui um comando para medir a cobertura dos testes:

```sh
npm run test:cov
```

Isso gera um relatório com métricas como:
- **Statements**: Porcentagem de linhas de código executadas nos testes.
- **Branches**: Cobertura de estruturas condicionais (`if`, `switch`).
- **Functions**: Quantidade de funções testadas.
- **Lines**: Quantidade total de linhas testadas.

#### **Melhorando a Cobertura**
- **Teste todas as funções**: Certifique-se de testar cada método do serviço/controlador.
- **Verifique cenários alternativos**: Teste respostas diferentes, erros, casos nulos.
- **Mocks para exceções**: Teste como a aplicação reage a erros:

  ```typescript
  it('deve lançar erro se não houver alunos', () => {
    jest.spyOn(service, 'getAlunos').mockImplementation(() => {
      throw new Error('Nenhum aluno encontrado');
    });

    expect(() => controller.getAlunos()).toThrow('Nenhum aluno encontrado');
  });
  ```