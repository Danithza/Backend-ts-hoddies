import { IProduct } from "../application/IProduct";
import { ProductDomain } from "./DTO/ProductDomain";
import { IProductRepository } from "../infraestructure/Repository/IproductRepository";
import { ProductNotFoundException } from "./exception/ProductNotFoundException";

export class ProductImpl implements IProduct {

  constructor(private repo: IProductRepository) {}

  async create(product: ProductDomain): Promise<ProductDomain> {
    return this.repo.save(product);
  }

  async getAll(): Promise<ProductDomain[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<ProductDomain | null> {
    return this.repo.findById(id);
  }

  async update(id: number, data: ProductDomain): Promise<ProductDomain> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new ProductNotFoundException(id);

    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new ProductNotFoundException(id);

    await this.repo.delete(id);
  }
}