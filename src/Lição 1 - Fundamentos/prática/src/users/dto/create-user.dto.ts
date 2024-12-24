// Importação de validadores da biblioteca 'class-validator'. Essa biblioteca é usada em conjunto com o NestJS para realizar validações automáticas de dados.
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

// Definição da classe CreateUserDto.
// Em NestJS, usamos "DTOs" (Data Transfer Objects) para definir a estrutura dos dados que queremos receber em requisições.
// Essa classe é como um "molde" para garantir que os dados recebidos estão no formato esperado.
export class CreateUserDto {

  // Validação e definição da propriedade "name".
  // O decorator @IsString() garante que o valor deve ser uma string.
  // O decorator @IsNotEmpty() garante que não pode ser vazio.
  @IsString()
  @IsNotEmpty()
  name: string;

  // Validação e definição da propriedade "email".
  // O decorator @IsEmail() garante que o valor deve ser um email válido.
  @IsEmail()
  email: string;

  // Validação e definição da propriedade "password".
  @IsString()
  @IsNotEmpty()
  password: string;
}
