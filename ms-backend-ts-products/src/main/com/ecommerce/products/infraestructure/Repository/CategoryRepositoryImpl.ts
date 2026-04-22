import "reflect-metadata";
import { CategoryEntity } from "../Entity/CategoryEntity";
import { ICategoryRepository } from "./ICategoryRepository";
import { CategoryMapper } from "../Mapper/CategoryMapper";
import { CategoryDomain } from "../../domain/DTO/CategoryDomain";
import { AppDataSource } from "../../config/database";
import { initDB } from "../../config/database.init";

export class CategoryRepositoryImpl implements ICategoryRepository {

  private mapper = new CategoryMapper();

  private async init(): Promise<void> {
    await initDB();
  }

  async save(category: CategoryDomain): Promise<CategoryDomain> {
    await this.init();

    const repo = AppDataSource.getRepository(CategoryEntity);
    const entity = this.mapper.toEntity(category);

    const saved = await repo.save(entity);

    return this.mapper.toDomain(saved);
  }

  async findAll(): Promise<CategoryDomain[]> {
    await this.init();

    const repo = AppDataSource.getRepository(CategoryEntity);
    const entities = await repo.find();

    return this.mapper.toDomainList(entities);
  }

  async findById(id: number): Promise<CategoryDomain | null> {
    await this.init();

    const repo = AppDataSource.getRepository(CategoryEntity);
    const entity = await repo.findOneBy({ id_categoria: id });

    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: number, data: CategoryDomain): Promise<CategoryDomain> {
    await this.init();

    const repo = AppDataSource.getRepository(CategoryEntity);

    await repo.update({ id_categoria: id }, data as any);

    const updated = await repo.findOneBy({ id_categoria: id });

    if (!updated) throw new Error("Categoría no encontrada tras actualizar");

    return this.mapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.init();

    const repo = AppDataSource.getRepository(CategoryEntity);

    await repo.delete({ id_categoria: id });
  }
}