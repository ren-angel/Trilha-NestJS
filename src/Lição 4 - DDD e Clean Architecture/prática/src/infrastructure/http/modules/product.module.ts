import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/infrastructure/http/modules/auth.module';
import { ProductController } from '../controllers/product.controller';
import { Product } from '../../../domain/entities/product.entity';
import { CreateProductUseCase } from 'src/application/use-cases/createProduct.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/findAllProducts.use-case';
import { FindOneProductUseCase } from 'src/application/use-cases/findOneProduct.use-case';
import { UpdateProductUseCase } from 'src/application/use-cases/updateProduct.use-case';
import { RemoveProductUseCase } from 'src/application/use-cases/removeProduct.use-case';
import { ProductRepositoryInterface } from 'src/domain/repositories/product.repository.interface';
import { TypeOrmProductRepository } from 'src/infrastructure/database/typeorm/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  providers: [
    {
      provide: 'ProductRepositoryInterface',
      useClass: TypeOrmProductRepository,
    },
    
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindOneProductUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,
  ],
  controllers: [ProductController],
})

export class ProductModule {}
