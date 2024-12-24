### **1. Módulos**
Os módulos são a base da organização em NestJS. Eles agrupam partes relacionadas da aplicação, como controladores e serviços, e permitem que o projeto seja escalável e modular.

#### **Definição:**
- Um módulo é uma classe decorada com `@Module`.
- Ele organiza e encapsula uma funcionalidade específica, como autenticação, usuários ou produtos.

#### **Exemplo de Módulo:**
```typescript
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController], // Declara os controladores do módulo
  providers: [UserService],     // Declara os serviços injetáveis do módulo
  exports: [UserService],       // (Opcional) Exporta para outros módulos
})
export class UserModule {}
```

#### **Funções:**
- **`controllers:`** Lista de controladores pertencentes ao módulo.
- **`providers:`** Lista de serviços (ou provedores) que serão injetados.
- **`exports:`** Permite compartilhar serviços entre módulos.

---

### **2. Controladores**
Os controladores são responsáveis por lidar com as **rotas HTTP** da aplicação. Eles recebem requisições, processam os dados e retornam respostas.

#### **Definição:**
- Decorados com `@Controller()`.
- Cada método é decorado para mapear uma rota HTTP específica (ex.: `@Get()`, `@Post()`).

#### **Exemplo de Controlador:**
```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') // Prefixo para as rotas
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id') // Rota GET /users/:id
  getUser(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }
}
```

#### **Funções:**
- Define as **rotas** e gerencia a lógica inicial da requisição.
- Depende de **serviços** para lidar com lógica de negócios.

---

### **3. Serviços**
Os serviços encapsulam a **lógica de negócios** e operações reutilizáveis. Eles são injetados em controladores (ou outros serviços) por meio do sistema de injeção de dependência do NestJS.

#### **Definição:**
- Decorados com `@Injectable()`.
- Podem ser registrados como provedores em módulos.

#### **Exemplo de Serviço:**
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [{ id: 1, name: 'John Doe' }];

  findUserById(id: string) {
    return this.users.find(user => user.id === parseInt(id));
  }
}
```

#### **Funções:**
- Contêm a **lógica central da aplicação**, como interagir com o banco de dados ou aplicar regras de negócio.
- Reutilizáveis por controladores ou outros serviços.

---

### **Fluxo Geral de uma Requisição**
1. O cliente faz uma requisição para uma **rota HTTP**.
2. O **Controlador** correspondente lida com a requisição.
3. O Controlador chama um **Serviço** para realizar a lógica de negócios.
4. O Serviço executa a lógica necessária e retorna os dados para o Controlador.
5. O Controlador envia a resposta ao cliente.