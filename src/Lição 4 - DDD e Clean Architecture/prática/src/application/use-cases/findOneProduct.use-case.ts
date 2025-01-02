import { Inject, Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "src/domain/repositories/product.repository.interface";
import { Product } from "src/domain/entities/product.entity";

@Injectable()
export class FindOneProductUseCase {

    constructor(
      @Inject('ProductRepositoryInterface')
      private readonly productRepository: ProductRepositoryInterface
    ) {}
  
    async execute(id: number): Promise<Product> {

      return this.productRepository.findOne(id);
    }
}
