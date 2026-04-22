import { ICategory } from "../application/ICategory";
import { CategoryDomain } from "./DTO/CategoryDomain";
import { ICategoryRepository } from "../infraestructure/Repository/ICategoryRepository";
import { CategoryNotFoundException } from "./exception/CategoryNotFoundException";
 
export class CategoryImpl implements ICategory {

  constructor(private repo: ICategoryRepository) {}

  async create(category: CategoryDomain): Promise<CategoryDomain> {
    return this.repo.save(category); 
  }

  async getAll(): Promise<CategoryDomain[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<CategoryDomain | null> {
    return this.repo.findById(id);
  }

  async update(id: number, data: CategoryDomain): Promise<CategoryDomain> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new CategoryNotFoundException(id);

    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new CategoryNotFoundException(id);

    await this.repo.delete(id);
  }
}