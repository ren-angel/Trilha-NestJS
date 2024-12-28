import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {

  // No construtor, injetamos o PrismaService, que nos da acesso a métodos para interagir com o banco de dados (como salvar, buscar, atualizar, deletar).
  constructor(private prisma: PrismaService) {}

  create(data: { name: string; email: string }) {

    return this.prisma.user.create({ data });
  }

  findAll() {

    return this.prisma.user.findMany();
  }

  findOne(id: number) {

    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: { name?: string; email?: string }) {

    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {

    return this.prisma.user.delete({ where: { id } });
  }
}