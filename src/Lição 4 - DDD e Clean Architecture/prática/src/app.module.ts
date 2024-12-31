import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ProductModule } from './infrastructure/http/modules/product.module';
import { Product } from './domain/entities/product.entity';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Product, User],
      synchronize: true,
    }),

    ProductModule,
  ],
})

export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}