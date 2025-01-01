import { User } from "../entities/user.entity";

// Definição da interface que define o contrato do repositório de usuários. Esta interface garante que qualquer repositório implementando-a terá que fornecer um método findOne para buscar um usuário pelo username e id.
export interface UserRepositoryInterface {
    
    // retorna uma Promise que resolve com a entidade User ou null, caso não seja encontrado.
    findOne(username: string, id: number): Promise<User | null>;
}
