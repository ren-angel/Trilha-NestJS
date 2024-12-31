import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; 

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  username: string;
}
