import { User } from "../entities/user.entity";

export interface UserRepositoryInterface {

    findOne(username: string, id: number): Promise<User | null>;
}