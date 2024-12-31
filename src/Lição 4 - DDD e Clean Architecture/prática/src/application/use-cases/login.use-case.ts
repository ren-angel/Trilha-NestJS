import { JwtService } from '@nestjs/jwt';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';

export class LoginUseCase {

    constructor(
      private readonly userRepository: UserRepositoryInterface,
      private readonly jwtService: JwtService,
    ) {}
  
    async execute(username: string, id: number): Promise<{ access_token: string }> {

      const existingUser = await this.userRepository.findOne(username, id);

      if (!existingUser) {

        throw new Error('Usuário não encontrado');
      }
      
      const payload = { username: existingUser.username, sub: existingUser.id };
      return { access_token: this.jwtService.sign(payload) };
    }
  }
  