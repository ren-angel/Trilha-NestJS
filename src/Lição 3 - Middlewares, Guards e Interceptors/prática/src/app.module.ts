import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// `NestModule` é uma interface para configurar middlewares.
// `MiddlewareConsumer` permite aplicar middlewares em rotas específicas.

import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    // O método `configure` é responsável por configurar middlewares, interceptadores, filtros, etc.
    // O parâmetro `consumer` é uma instância de `MiddlewareConsumer`, que oferece métodos para configurar os middlewares da aplicação. Ele permite que você defina quais middlewares devem ser aplicados em quais rotas.

    consumer.apply(LoggerMiddleware).forRoutes('*');
    // Aplica o middleware `LoggerMiddleware` a todas as rotas (`*`).
    // O `forRoutes` pode ser usado para restringir o middleware a rotas específicas.
  }
}
