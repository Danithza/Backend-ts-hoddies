import { ProductDomain } from "../domain/DTO/ProductDomain";

export interface IProduct {
  create(product: ProductDomain): Promise<ProductDomain>;
  getAll(): Promise<ProductDomain[]>;
  getById(id: number): Promise<ProductDomain | null>;
  update(id: number, data: ProductDomain): Promise<ProductDomain>;
  delete(id: number): Promise<void>;
}