import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @Inject('UserRepositoryInterface') // Interfaces não podem ser usadas diretamente como tokens, então usamos o decorador `Inject` para dar um nome (string token) ao nosso provider.
        private readonly userRepository: UserRepositoryInterface
    ) {}

    findUser(username: string, id: number): Promise<User> {

        return this.userRepository.findOne(username, id);
    }
}
