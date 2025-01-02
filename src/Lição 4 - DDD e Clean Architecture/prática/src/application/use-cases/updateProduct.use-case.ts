import { Inject, Injectable } from "@nestjs/common";
import { UpdateProductDto } from "../dtos/update-product.dto"; 
import { ProductRepositoryInterface } from "src/domain/repositories/product.repository.interface";
import { UpdateResult } from "typeorm";

@Injectable()
export class UpdateProductUseCase {

    constructor(
      @Inject('ProductRepositoryInterface')
      private readonly productRepository: ProductRepositoryInterface
    ) {}
  
    async execute(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResult> {

      return this.productRepository.update(id, updateProductDto);
    }
}
