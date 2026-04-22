import { ProductDomain } from "../../domain/DTO/ProductDomain";

export interface IProductRepository {
  save(product: ProductDomain): Promise<ProductDomain>;
  findAll(): Promise<ProductDomain[]>;
  findById(id: number): Promise<ProductDomain | null>;
  update(id: number, data: ProductDomain): Promise<ProductDomain>;
  delete(id: number): Promise<void>;
}