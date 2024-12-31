import { Controller, UseGuards, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../../security/jwt.guard';
import { ProductService } from '../../../domain/services/product.service';
import { CreateProductDto } from '../../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../../application/dtos/update-product.dto';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {

    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {

    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.productService.remove(+id);
  }
}
