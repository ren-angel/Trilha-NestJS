import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Permite que o repositório do TypeORM seja injetado nesta classe.
import { Repository } from 'typeorm'; // Representa um repositório que fornece métodos para interagir com a entidade.
import { User } from './user.entity';

@Injectable()
export class UserService {

  // No construtor, injetamos o repositório da entidade "User".
  // Isso significa que teremos acesso a métodos para interagir com o banco de dados (como salvar, buscar, atualizar, deletar).
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // O parâmetro "data" é um objeto com os dados do usuário (parcial, pois não precisamos enviar todos os campos).
  create(data: Partial<User>) {

    return this.userRepository.save(data); // O método "save" salva os dados na tabela "User".
  }

  findAll() {

    return this.userRepository.find(); // O método "find" retorna todos os registros da tabela "User".
  }

  findOne(id: number) {

    return this.userRepository.findOne({ where: { id } }); // O método "findOne" busca um registro específico pelo ID.
  }

  update(id: number, data: Partial<User>) {

    return this.userRepository.update(id, data); // O método "update" atualiza os dados no banco para o ID fornecido.
  }

  remove(id: number) {
    
    return this.userRepository.delete(id); // O método "delete" remove o registro com o ID fornecido.
  }
}
