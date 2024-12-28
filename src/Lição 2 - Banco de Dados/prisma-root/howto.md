## **Prisma**
### Configuração de Conexão
1. **Instalar dependências**:
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```
   O comando `prisma init` criará o arquivo `prisma/schema.prisma`.

2. **Configurar o `schema.prisma`**:
   ```prisma
   datasource db {
     provider = "mysql" // ou outro banco, como "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }
   ```

3. **Configurar no NestJS**:
   - Crie um serviço para encapsular o Prisma:
     ```typescript
     import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
     import { PrismaClient } from '@prisma/client';

     @Injectable()
     export class PrismaService extends PrismaClient
       implements OnModuleInit, OnModuleDestroy {
       async onModuleInit() {
         await this.$connect();
       }

       async onModuleDestroy() {
         await this.$disconnect();
       }
     }
     ```

   - Registre no módulo:
     ```typescript
     import { Module } from '@nestjs/common';
     import { PrismaService } from './prisma.service';

     @Module({
       providers: [PrismaService],
       exports: [PrismaService],
     })
     export class PrismaModule {}
     ```

### Criando Entidades e Relacionamentos
1. **Definindo modelos no `schema.prisma`**:
   ```prisma
   model User {
     id    Int     @id @default(autoincrement())
     name  String
     posts Post[]
   }

   model Post {
     id     Int    @id @default(autoincrement())
     title  String
     userId Int
     user   User   @relation(fields: [userId], references: [id])
   }
   ```

2. **Gerar cliente Prisma**:
   Após editar o `schema.prisma`, execute:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Consultando o banco**:
   Use o `PrismaService` no seu código:
   ```typescript
   import { Injectable } from '@nestjs/common';
   import { PrismaService } from './prisma.service';

   @Injectable()
   export class UserService {
     constructor(private prisma: PrismaService) {}

     async getAllUsers() {
       return this.prisma.user.findMany({
         include: { posts: true },
       });
     }
   }
   ```