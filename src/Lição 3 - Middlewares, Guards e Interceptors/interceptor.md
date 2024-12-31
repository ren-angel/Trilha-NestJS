## 3. Interceptors: Manipulação de Responses e Tratamento de Erros

Interceptors permitem transformar as respostas antes de enviá-las ao cliente e manipular exceções para padronizar o tratamento de erros.

### Implementação de Interceptors
- Crie uma classe que implemente a interface `NestInterceptor`.
- Use o método `intercept` para definir a lógica.

**Exemplo de Manipulação de Resposta:**

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({ success: true, data })) // Adiciona um wrapper à resposta
    );
  }
}
```

**Exemplo de Tratamento de Erros:**

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        console.error('Error intercepted:', err);
        throw new BadGatewayException('Custom Error Message'); // Customiza o erro
      })
    );
  }
}
```

### Aplicação de Interceptors
- Use o decorador `@UseInterceptors()` em um controlador, rota ou globalmente.

**Exemplo:**

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

@Controller('example')
@UseInterceptors(TransformInterceptor)
export class ExampleController {
  @Get()
  getExample() {
    return { name: 'John Doe', age: 30 }; // Será envelopado pelo TransformInterceptor
  }
}
```