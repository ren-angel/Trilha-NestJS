
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importamos o TypeOrmModule para configurar e conectar ao banco de dados usando o TypeORM.
import { UserController } from './app.controller';
import { UserService } from './app.service';
import { User } from './user.entity';

@Module({
  // A propriedade "imports" é usada para importar outros módulos ou configurar bibliotecas, como o TypeORM neste caso.
  imports: [
    // Configuração inicial do TypeORM para conectar ao banco de dados MySQL.
    TypeOrmModule.forRoot({
      type: 'mysql', // O tipo de banco de dados (neste caso, MySQL).
      host: 'localhost', // O endereço do servidor do banco de dados (neste caso, na máquina local).
      port: 3306, // A porta padrão para o MySQL.
      username: 'root', // O nome de usuário para acessar o banco de dados.
      password: 'root', // A senha para acessar o banco de dados.
      database: 'teste', // O nome do banco de dados que será usado.
      entities: [User], // As entidades que o TypeORM usará para criar tabelas no banco.
      synchronize: true, // Faz com que o TypeORM crie ou atualize automaticamente as tabelas no banco de acordo com as entidades.
    }),

    // TypeOrmModule.forFeature é usado para registrar entidades que queremos usar nos repositórios injetados.
    TypeOrmModule.forFeature([User]), // Aqui registramos a entidade "User".
  ],
  controllers: [UserController],
  providers: [UserService],
})

export class AppModule {}
