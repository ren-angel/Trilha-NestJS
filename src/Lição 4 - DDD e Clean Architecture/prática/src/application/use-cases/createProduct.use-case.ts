import { Inject, Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "src/domain/repositories/product.repository.interface";
import { CreateProductDto } from "src/application/dtos/create-product.dto";
import { Product } from "src/domain/entities/product.entity";

@Injectable()
export class CreateProductUseCase {

  constructor(
    @Inject('ProductRepositoryInterface')
    private readonly productRepository: ProductRepositoryInterface
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {

    return await this.productRepository.create(createProductDto);
  }
}
