import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductRepositoryInterface } from "src/domain/repositories/product.repository.interface";
import { CreateProductDto } from "src/application/dtos/create-product.dto";
import { UpdateProductDto } from "src/application/dtos/update-product.dto";
import { Product } from "src/domain/entities/product.entity";

@Injectable()
export class TypeOrmProductRepository implements ProductRepositoryInterface {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {

    return this.productRepository.save(createProductDto);
  }

  findAll() {

    return this.productRepository.find();
  }

  findOne(id: number) {

    return this.productRepository.findOne({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {

    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
      
    return this.productRepository.delete(id);
  }
}
