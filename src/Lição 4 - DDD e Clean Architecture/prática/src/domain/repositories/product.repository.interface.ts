import { CreateProductDto } from "src/application/dtos/create-product.dto";
import { UpdateProductDto } from "src/application/dtos/update-product.dto";
import { Product } from "../entities/product.entity";
import { DeleteResult, UpdateResult } from "typeorm";

export interface ProductRepositoryInterface {

    create(createProductDto: CreateProductDto): Promise<Product>;

    findAll(): Promise<Product[] | null>;
    
    findOne(id: number): Promise<Product | null>;

    update(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResult | null>;

    remove(id: number): Promise<DeleteResult>;
}
