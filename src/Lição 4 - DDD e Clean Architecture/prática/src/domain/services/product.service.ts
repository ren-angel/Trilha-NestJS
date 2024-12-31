import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {

    return this.productRepository.save(createProductDto);
  }

  findAll() {

    return this.productRepository.find();
  }

  findOne(id: number) {

    return this.productRepository.findOne({ where: { id }});
  }

  update(id: number, updateProductDto: UpdateProductDto) {

    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {

    return this.productRepository.delete(id);
  }
}
