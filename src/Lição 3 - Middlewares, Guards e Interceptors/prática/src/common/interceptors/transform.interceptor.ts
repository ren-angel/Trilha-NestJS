import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// `NestInterceptor` é a interface para criar interceptores.
// `CallHandler` gerencia o fluxo da requisição e resposta.

import { Observable } from 'rxjs';
// `Observable` representa uma fonte de dados assíncrona, usada frequentemente no NestJS.
// `rxjs` (Reactive Extensions for JavaScript) é uma biblioteca de programação reativa (reactive programming, que é um paradigma de programação assíncrona) para JavaScript), ele facilita a manipulação de fluxos assíncronos de dados com o uso de observáveis

import { map } from 'rxjs/operators';
// `map` é um operador usado para transformar os dados que fluem através do `Observable`.

@Injectable()
export class TransformInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // `context` contém informações sobre o contexto da execução da requisição, como o objeto de solicitação HTTP, o handler (método do controlador) sendo chamado, e outras informações de contexto específicas para o fluxo da requisição.
    // `next` é um objeto do tipo `CallHandler`, que permite passar a requisição para o próximo handler. O método `next.handle()` vai continuar a execução da requisição e retornar uma resposta ou manipulação.
    // `Observable<any>` é um tipo de dado que representa um fluxo de dados assíncrono que pode emitir valores de qualquer tipo. Isso permite que você manipule e modifique a resposta antes de ela ser enviada ao cliente

    return next.handle().pipe(
      // Chama o próximo manipulador no fluxo (geralmente o método do controlador).
      // O método `handle()` retorna um Observable que vai emitir a resposta da requisição.
      // O `.pipe()` permite aplicar operadores RXJS para manipular o fluxo de dados, como logar, modificar a resposta, ou até interromper o fluxo antes de devolver a resposta.

      map(data => ({ success: true, data }))
      // Modifica a resposta antes de enviá-la ao cliente.
      // Aqui, a resposta original é encapsulada em um objeto com a estrutura `{ success: true, data }`.
    );
  }
}
