import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; 

// @Entity() é um decorador que diz que esta classe será uma "entidade" no banco de dados.
// Entidades são como moldes para tabelas do banco de dados.
@Entity()
export class User {

  // @PrimaryGeneratedColumn() cria uma coluna no banco chamada "id", que será a chave primária (primary key).
  // Além disso, ela será gerada automaticamente.
  @PrimaryGeneratedColumn()
  id: number;

  // @Column() define que o atributo "name" será uma coluna no banco de dados.
  // Ela vai armazenar textos, e o nome da coluna será "name" por padrão.
  @Column()
  name: string;

  // Mais uma coluna, dessa vez para armazenar o email do usuário.
  @Column()
  email: string;
}
