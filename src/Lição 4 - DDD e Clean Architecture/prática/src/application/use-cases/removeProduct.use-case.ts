import { Inject, Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "src/domain/repositories/product.repository.interface";
import { DeleteResult } from "typeorm";

@Injectable()
export class RemoveProductUseCase {

    constructor(
      @Inject('ProductRepositoryInterface')
      private readonly productRepository: ProductRepositoryInterface
    ) {}
  
    async execute(id: number): Promise<DeleteResult> {

      return this.productRepository.remove(id);
    }
}
