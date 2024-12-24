// Aqui fazemos o mesmo que em create-user.dto.ts
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {

  // O decorator @IsOptional() checa se o valor está vazio, e se sim, então ignora todos os validadores dele.
  // O operador de encadeamento opcional (Optional Chaining), representado por uma "?" após a propriedade, checa se "name" existe antes de tentar acessá-lo, evitando erros caso "name" não exista, já que ele é opcional.
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
