import { Controller, UseGuards, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../../security/jwt.guard';
import { CreateProductDto } from '../../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../../application/dtos/update-product.dto';

import { CreateProductUseCase } from 'src/application/use-cases/createProduct.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/findAllProducts.use-case';
import { FindOneProductUseCase } from 'src/application/use-cases/findOneProduct.use-case';
import { UpdateProductUseCase } from 'src/application/use-cases/updateProduct.use-case';
import { RemoveProductUseCase } from 'src/application/use-cases/removeProduct.use-case';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {

  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findOneProductUseCase: FindOneProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {

    return this.createProductUseCase.execute(createProductDto);
  }

  @Get()
  findAll() {

    return this.findAllProductsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.findOneProductUseCase.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {

    return this.updateProductUseCase.execute(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.removeProductUseCase.execute(+id);
  }
}
