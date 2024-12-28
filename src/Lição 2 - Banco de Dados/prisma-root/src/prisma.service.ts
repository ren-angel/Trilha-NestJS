import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'; // OnModuleInit e OnModuleDestroy permitem que a classe execute ações específicas quando o módulo é inicializado ou destruído.
import { PrismaClient } from '@prisma/client'; // Importamos o PrismaClient, que é a classe principal usada para interagir com o banco de dados no Prisma.

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  // A classe "PrismaService" estende o "PrismaClient", herdando todos os métodos para interagir com o banco de dados.
  // Ela também implementa "OnModuleInit" e "OnModuleDestroy", que nos permitem gerenciar a conexão do Prisma com o banco.

  // Este método será executado automaticamente quando o módulo que usa este serviço for inicializado.
  async onModuleInit() {

    await this.$connect(); // O método $connect conecta o Prisma ao banco de dados.
  }

  // Este método será executado automaticamente quando o módulo que usa este serviço for destruído.
  async onModuleDestroy() {
    
    await this.$disconnect(); // O método $disconnect desconecta o Prisma do banco de dados.
  }
}
