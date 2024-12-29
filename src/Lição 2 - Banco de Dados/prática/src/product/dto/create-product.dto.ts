import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDecimal } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  @IsDecimal()
  @IsNotEmpty()
  price: number;
}
