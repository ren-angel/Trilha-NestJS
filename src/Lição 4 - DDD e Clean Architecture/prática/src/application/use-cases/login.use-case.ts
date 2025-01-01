import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';

// Caso de uso responsável por realizar o login de um usuário.
@Injectable()
export class LoginUseCase {

    // O construtor recebe o repositório de usuários e o serviço de JWT como dependências.
    constructor(
      private readonly userRepository: UserRepositoryInterface, // Repositório de usuários (abstração)
      private readonly jwtService: JwtService, // Serviço JWT para geração de tokens
    ) {}
  
    // retorna um objeto contendo o token de acesso gerado.
    async execute(username: string, id: number): Promise<{ access_token: string }> {

      const existingUser = await this.userRepository.findOne(username, id);

      if (!existingUser) {

        throw new Error('Usuário não encontrado');
      }
      
      const payload = { username: existingUser.username, sub: existingUser.id };

      return { access_token: this.jwtService.sign(payload) };
    }
}
