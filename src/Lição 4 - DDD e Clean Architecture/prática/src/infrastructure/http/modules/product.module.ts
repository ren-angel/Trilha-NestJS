import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/infrastructure/http/modules/auth.module';
import { ProductService } from '../../../domain/services/product.service';
import { ProductController } from '../controllers/product.controller';
import { Product } from '../../../domain/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
