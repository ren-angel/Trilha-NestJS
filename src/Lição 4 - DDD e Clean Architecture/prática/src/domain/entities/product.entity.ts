import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; 

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'float', nullable: false })
  price: number;
}
