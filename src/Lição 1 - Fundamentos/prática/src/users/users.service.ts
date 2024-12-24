// Importa o decorator 'Injectable' do NestJS.
import { Injectable } from '@nestjs/common';

// Importa os DTOs usados para criar e atualizar usuários.
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// O decorator '@Injectable()' transforma a classe em um serviço injetável, ou seja, ela pode ser usada por outros componentes, como controladores.
@Injectable()
export class UsersService {

  // Cria uma array privada para armazenar os usuários em memória.
  // No mundo real, isso seria substituído por uma conexão com um banco de dados.
  private users = [];

  // Método para criar um novo usuário.
  create(createUserDto: CreateUserDto) {

    // Cria um novo objeto de usuário com um ID único.
    // O ID é baseado no tamanho atual da lista de usuários.
    const newUser = { id: this.users.length + 1, ...createUserDto };

    // Adiciona o novo usuário à lista.
    this.users.push(newUser);

    // Retorna o usuário criado.
    return newUser;
  }

  // Método para listar todos os usuários.
  findAll() {

    // Retorna todos os usuários armazenados na lista.
    return this.users;
  }

  // Método para encontrar um usuário pelo ID.
  findOne(id: number) {

    // Procura um usuário com o ID correspondente na lista.
    const user = this.users.find((user) => user.id === id);

    // Se o usuário não for encontrado, retorna uma mensagem de erro.
    if (!user) {

      return { message: `Usuário de ID ${id} não encontrado` };
    }

    // Caso contrário, retorna o usuário encontrado.
    return user;
  }

  // Método para atualizar os dados de um usuário pelo ID.
  update(id: number, updateUserDto: UpdateUserDto) {

    // Encontra o índice do usuário na lista.
    const index = this.users.findIndex((user) => user.id === id);

    // Se o índice for -1, o usuário não foi encontrado.
    if (index === -1) {

      return { message: `Usuário de ID ${id} não encontrado` };
    }

    // Atualiza os dados do usuário com as novas informações do DTO.
    this.users[index] = { ...this.users[index], ...updateUserDto };

    // Retorna o usuário atualizado.
    return this.users[index];
  }

  // Método para remover um usuário pelo ID.
  remove(id: number) {

    // Encontra o índice do usuário na lista.
    const index = this.users.findIndex((user) => user.id === id);

    // Se o índice for -1, o usuário não foi encontrado.
    if (index === -1) {
      
      return { message: `Usuário de ID ${id} não encontrado` };
    }

    // Remove o usuário da lista e armazena o usuário excluído.
    const deletedUser = this.users.splice(index, 1);

    // Retorna o usuário que foi removido.
    return deletedUser[0];
  }
}
