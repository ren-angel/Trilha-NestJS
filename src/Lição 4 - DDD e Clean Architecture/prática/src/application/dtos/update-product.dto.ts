import { IsString, IsNumber, IsPositive, IsDecimal, IsOptional } from 'class-validator';

export class UpdateProductDto {

  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsPositive()
  @IsDecimal()
  @IsOptional()
  price?: number;
}
