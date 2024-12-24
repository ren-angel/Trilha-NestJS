// Importação de diversos decoradores e classes do NestJS.
// - Controller: Define que a classe é um controlador, responsável por lidar com requisições HTTP.
// - ClassSerializerInterceptor: Um interceptor que transforma os dados da resposta, como aplicar o @Exclude na entidade de exemplo "Users" automaticamente.
// - Get, Post, Put, Delete: Decorators que definem os métodos HTTP aceitos (GET, POST, PUT, DELETE).
// - Body: Extrai o corpo da requisição (JSON enviado pelo cliente).
// - Param: Extrai parâmetros da URL (ex.: `/users/:id`).
// - UseInterceptors: Aplica interceptores em métodos específicos.
import { Controller, ClassSerializerInterceptor, Get, Post, Body, Put, Param, Delete, UseInterceptors } from '@nestjs/common';

// Importação do serviço responsável pela lógica de negócio dos usuários.
import { UsersService } from './users.service';

// Importação dos DTOs para validação de dados ao criar ou atualizar usuários.
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Define um controlador para o recurso "users".
// Isso significa que todas as rotas aqui terão o prefixo '/users'.
@Controller('users')
export class UsersController {

  // Injeta o serviço 'UsersService' no controlador.
  // O "private" significa que a variável será acessível apenas dentro desta classe.
  // O "readonly" significa que o valor de "usersService" não pode ser alterado após ser atribuído.
  // Por estarmos lidando com TypeScript, uma linguagem tipada, ou seja, em que é necessário definir o tipo dos dados, nos precisamos definir o tipo da variável ao criá-la. Neste caso, "usersService" é uma instância do tipo "UsersService". 
  constructor(private readonly usersService: UsersService) {}

  // Intercepta a resposta deste endpoint para aplicar o `ClassSerializerInterceptor`.
  // @UseInterceptors(ClassSerializerInterceptor)

  // Define uma rota POST para criar usuários.
  // A URL será '/users' e espera dados no corpo da requisição.
  @Post()
  create(@Body() createUserDto: CreateUserDto) {

    // Chama o método 'create' no serviço, passando os dados validados pelo DTO.
    return this.usersService.create(createUserDto);
  }

  // Define uma rota GET para buscar todos os usuários.
  // A URL será '/users' e não espera nenhum parâmetro ou corpo na requisição.
  @Get()
  findAll() {

    // Chama o método 'findAll' no serviço, que retorna todos os usuários.
    return this.usersService.findAll();
  }

  // Define uma rota GET para buscar um usuário específico por ID.
  // A URL será '/users/:id', onde ':id' é um parâmetro dinâmico.
  @Get(':id')
  findOne(@Param('id') id: string) {

    // Extrai o parâmetro 'id' da URL e o converte para número.
    // Chama o método 'findOne' no serviço para buscar o usuário pelo ID.
    // O operador unário de mais (Unary Plus), representado pelo "+" antes do valor que é passado como parâmetro para o serviço, faz o trabalho de converter o valor para número sem a necessidade de nós manualmente fazermos isto com parseInt() ou Number().
    return this.usersService.findOne(+id);
  }

  // Define uma rota PUT para atualizar um usuário específico por ID.
  // A URL será '/users/:id' e espera dados no corpo da requisição.
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    // Extrai o parâmetro 'id' e os dados do corpo da requisição.
    // Chama o método 'update' no serviço para atualizar o usuário pelo ID.
    return this.usersService.update(+id, updateUserDto);
  }

  // Define uma rota DELETE para remover um usuário específico por ID.
  // A URL será '/users/:id'.
  @Delete(':id')
  remove(@Param('id') id: string) {
    
    // Extrai o parâmetro 'id' da URL.
    // Chama o método 'remove' no serviço para excluir o usuário pelo ID.
    return this.usersService.remove(+id);
  }
}
