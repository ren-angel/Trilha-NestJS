## 2. Guards: Implementação de Autenticação e Autorização

Guards são responsáveis por determinar se uma rota pode ser acessada com base em certas condições (autenticação, autorização, etc.). Eles funcionam antes que a execução chegue ao manipulador de rotas.

### Implementação de Guards
- Crie uma classe que implemente a interface `CanActivate`.
- Use o método `canActivate` para escrever a lógica.

**Exemplo de Autenticação Simples:**

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.headers['authorization']; // Simulação de autenticação
    return !!user; // Permite acesso se o token de autorização existir
  }
}
```

### Aplicação de Guards
- Use o decorador `@UseGuards()` para aplicar um guard a um controlador ou rota.

**Exemplo:**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(AuthGuard)
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
```