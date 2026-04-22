import { CategoryDomain } from "../../domain/DTO/CategoryDomain";

export interface ICategoryRepository {
  save(category: CategoryDomain): Promise<CategoryDomain>;
  findAll(): Promise<CategoryDomain[]>;
  findById(id: number): Promise<CategoryDomain | null>;
  update(id: number, data: CategoryDomain): Promise<CategoryDomain>;
  delete(id: number): Promise<void>;
}