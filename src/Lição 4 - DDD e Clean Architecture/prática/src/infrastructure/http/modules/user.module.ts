import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../../../domain/services/user.service';
import { User } from '../../../domain/entities/user.entity';
import { UserRepositoryInterface } from 'src/domain/repositories/user.repository.interface';
import { TypeOrmUserRepository } from 'src/infrastructure/database/typeorm/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        // Mapeando a interface para a implementação concreta.
        {
            provide: 'UserRepositoryInterface', // String token que demos à interface.
            useClass: TypeOrmUserRepository, // Implementação concreta.
        },

        UserService],
    exports: [UserService],
})

export class UserModule {}