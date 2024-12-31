import { Injectable, NestMiddleware } from '@nestjs/common';
// `NestMiddleware` é a interface para criar middlewares no NestJS.

import { Request, Response, NextFunction } from 'express';
// Tipos fornecidos pelo Express para descrever a requisição (`Request`), resposta (`Response`) e a função `next`.

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    // `use` é o método obrigatório da interface `NestMiddleware`. Ele é chamado para cada requisição que passa pelo middleware.

    console.log(`[${req.method}] ${req.url}`);
    // Exibe no console o método HTTP (`GET`, `POST`, etc.) e a URL da requisição.

    next();
    // Chama a função `next()` para continuar o fluxo da requisição. Sem isso, a requisição ficaria "presa" no middleware.
  }
}
