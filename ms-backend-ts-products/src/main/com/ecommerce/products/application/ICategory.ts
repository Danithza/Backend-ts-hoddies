import { CategoryDomain } from "../domain/DTO/CategoryDomain";

export interface ICategory {
  create(category: CategoryDomain): Promise<CategoryDomain>;
  getAll(): Promise<CategoryDomain[]>;
  getById(id: number): Promise<CategoryDomain | null>;
  update(id: number, data: CategoryDomain): Promise<CategoryDomain>;
  delete(id: number): Promise<void>;
}