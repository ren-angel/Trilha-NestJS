import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository.interface";
import { User } from "../../../domain/entities/user.entity";

@Injectable()
export class TypeOrmUserRepository implements UserRepositoryInterface {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findOne(username: string, id: number) {
    
    return this.userRepository.findOne({ where: { id, username } });
  }
}
