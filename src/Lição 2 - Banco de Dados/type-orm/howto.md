### Configuração de Conexão
1. **Instalar dependências**:
   ```bash
   npm install @nestjs/typeorm typeorm mysql2
   ```
   (Substitua `mysql2` pelo driver do banco de dados que você utilizar, como `pg` para PostgreSQL.)

2. **Configurar no módulo principal**:
   Crie ou edite o arquivo `app.module.ts`:
   ```typescript
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { User } from './user.entity';

   @Module({
     imports: [
       TypeOrmModule.forRoot({
         type: 'mysql', // ou outro tipo
         host: 'localhost',
         port: 3306,
         username: 'root',
         password: 'password',
         database: 'test_db',
         entities: [User],
         synchronize: true, // Não recomendado para produção
       }),
       TypeOrmModule.forFeature([User]), // Registra repositórios no escopo
     ],
     controllers: [],
     providers: [],
   })
   export class AppModule {}
   ```

### Criando Entidades e Relacionamentos
1. **Definindo uma entidade**:
   ```typescript
   import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
   import { Post } from './post.entity';

   @Entity()
   export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;

     @OneToMany(() => Post, (post) => post.user)
     posts: Post[];
   }
   ```

2. **Relacionando com outra entidade**:
   ```typescript
   import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
   import { User } from './user.entity';

   @Entity()
   export class Post {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     title: string;

     @ManyToOne(() => User, (user) => user.posts)
     user: User;
   }
   ```