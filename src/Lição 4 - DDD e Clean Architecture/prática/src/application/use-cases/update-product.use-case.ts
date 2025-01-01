import { UpdateProductDto } from "../dtos/update-product.dto"; 
import { ProductRepositoryInterface } from "src/domain/repositories/product.repository.interface";
import { Product } from "src/domain/entities/product.entity";

export class UpdateProductUseCase {

    constructor(private readonly productRepository: ProductRepositoryInterface) {}
  
    async execute(createProductDto: CreateProductDto): Promise<Product> {

      return this.productRepository.create(createProductDto);
    }
}
