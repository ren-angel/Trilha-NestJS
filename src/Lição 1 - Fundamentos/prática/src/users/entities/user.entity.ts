// Está entidade está aqui apenas para exemplo

// Importação do decorator 'Exclude' da biblioteca 'class-transformer'. Essa biblioteca é usada para transformar objetos de forma flexível, controlando como os dados são exibidos ou convertidos.
import { Exclude } from 'class-transformer';

// Definição da classe User.
// Essa classe representa um modelo de usuário. É comum usar classes assim para estruturar os dados em aplicações TypeScript/NestJS.
export class User {
  
  // A propriedade 'id' representa o identificador único de um usuário, geralmente um número gerado pelo banco de dados.
  id: number;

  // A propriedade 'name' representa o nome do usuário.
  name: string;

  // A propriedade 'email' representa o endereço de email do usuário.
  email: string;

  // A propriedade 'password' representa a senha do usuário.
  // O decorator @Exclude() indica que essa propriedade será excluída quando o objeto User for convertido em JSON.
  // Isso é útil para evitar expor dados sensíveis, como senhas, em respostas de APIs.
  @Exclude()
  password: string;
}
