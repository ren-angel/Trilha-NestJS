import { Inject, Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "src/domain/repositories/product.repository.interface";
import { Product } from "src/domain/entities/product.entity";

@Injectable()
export class FindAllProductsUseCase {

    constructor(
      @Inject('ProductRepositoryInterface')
      private readonly productRepository: ProductRepositoryInterface
    ) {}
  
    async execute(): Promise<Product[]> {
        
      return this.productRepository.findAll();
    }
}
