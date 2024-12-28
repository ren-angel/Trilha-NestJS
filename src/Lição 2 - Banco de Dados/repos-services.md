## **Repositories**
Os **Repositories** são responsáveis por:
- **Acessar o banco de dados** diretamente, seja para consultas, inserções, atualizações ou exclusões.
- Encapsular a lógica de persistência de dados, deixando o restante da aplicação desacoplado do banco.

### **Boas práticas para Repositories**
1. **Foco exclusivo na persistência de dados**:
   - Não implemente lógica de negócios ou manipulação complexa de dados no repository.
   - Mantenha os métodos simples e específicos, como `findByEmail` ou `deleteById`.

2. **Uso em conjunto com ORM ou ODM**:
   - Quando usar TypeORM, registre entidades com `@InjectRepository` para aproveitar métodos como `find`, `save` ou `delete`.
   - Para Prisma, encapsule as operações do cliente Prisma (`prisma.user.create`, `prisma.user.findMany`) em classes específicas.

3. **Métodos reutilizáveis**:
   - Crie métodos que possam ser utilizados por diferentes serviços. Por exemplo:
     ```typescript
     async findByEmail(email: string): Promise<User | null> {
       return this.userRepository.findOne({ where: { email } });
     }
     ```

---

## **Services**
Os **Services** são responsáveis por:
- **Implementar a lógica de negócios** da aplicação.
- Orquestrar chamadas ao Repository e a outras dependências para cumprir casos de uso da aplicação.
- Garantir validações e interações entre diferentes camadas ou fontes de dados.

### **Boas práticas para Services**
1. **Camada intermediária entre controller e repository**:
   - Os services devem abstrair a lógica de persistência do banco de dados para que os controllers não precisem lidar com isso diretamente.
   - Exemplos de lógica: validações de dados, envio de notificações, cálculos antes de salvar algo.

2. **Fácil testabilidade**:
   - Com serviços bem definidos, é mais fácil criar testes unitários para a lógica de negócios sem depender diretamente do banco.

3. **Reutilização entre diferentes partes da aplicação**:
   - Caso a mesma lógica de negócios seja necessária em múltiplos módulos, implemente-a no service.

4. **Evite lógica pesada no controller**:
   - Lembre-se de que o controller é apenas uma interface entre o cliente e o servidor. A lógica principal deve residir no service.

---

## **Separação de Responsabilidades**
A separação clara entre **Repositories** e **Services** evita misturas de responsabilidades e facilita a manutenção. Um exemplo de como isso é organizado:

1. **Repository**:
   ```typescript
   @Injectable()
   export class UserRepository {
     constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

     async findById(id: number): Promise<User | null> {
       return this.repo.findOne({ where: { id } });
     }

     async save(user: Partial<User>): Promise<User> {
       return this.repo.save(user);
     }
   }
   ```

2. **Service**:
   ```typescript
   @Injectable()
   export class UserService {
     constructor(private readonly userRepository: UserRepository) {}

     async getUserProfile(id: number): Promise<User> {
       const user = await this.userRepository.findById(id);
       if (!user) {
         throw new Error('User not found');
       }
       return user;
     }

     async registerUser(data: CreateUserDto): Promise<User> {
       // Validações e lógica de negócios
       if (await this.userRepository.findById(data.id)) {
         throw new Error('User already exists');
       }

       return this.userRepository.save(data);
     }
   }
   ```

3. **Controller**:
   ```typescript
   @Controller('users')
   export class UserController {
     constructor(private readonly userService: UserService) {}

     @Get(':id')
     getUser(@Param('id') id: number) {
       return this.userService.getUserProfile(id);
     }

     @Post()
     createUser(@Body() data: CreateUserDto) {
       return this.userService.registerUser(data);
     }
   }
   ```

---

## **Vantagens da Separação**
1. **Facilidade de teste**:
   - Repositories e Services podem ser testados isoladamente.
2. **Reutilização de código**:
   - Um método em um repository pode ser usado por múltiplos services.
3. **Organização**:
   - Cada camada tem uma responsabilidade clara, tornando o código mais legível.
4. **Desacoplamento**:
   - Os services podem ser usados mesmo se o banco de dados mudar, desde que o repository seja ajustado.