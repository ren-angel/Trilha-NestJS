import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ProductModule } from './infrastructure/http/modules/product.module';
import { Product } from './domain/entities/product.entity';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [
    // Importa o ConfigModule para habilitar o uso de variáveis de ambiente em toda a aplicação
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível globalmente sem necessidade de importá-lo em outros módulos
      // envFilePath: '../.env', // Especifica o caminho para o arquivo .env onde as variáveis de ambiente estão definidas. Por padrão, o arquivo .env é procurado na raiz do projeto.
    }),

    // Configuração assíncrona do TypeOrmModule para usar o ConfigService e acessar variáveis de ambiente dinamicamente.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Product, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    ProductModule,
  ],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}