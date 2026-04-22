import "reflect-metadata";
import { ProductEntity } from "../Entity/ProductEntity";
import { IProductRepository } from "./IproductRepository";
import { ProductMapper } from "../Mapper/ProductMapper";
import { ProductDomain } from "../../domain/DTO/ProductDomain";
import { AppDataSource } from "../../config/database";
import { initDB } from "../../config/database.init";

export class ProductRepositoryImpl implements IProductRepository {

  private mapper = new ProductMapper();

  private async init(): Promise<void> {
    await initDB();
  }

  async save(product: ProductDomain): Promise<ProductDomain> {
    await this.init();

    const repo = AppDataSource.getRepository(ProductEntity);
    const entity = this.mapper.toEntity(product);

    const saved = await repo.save(entity);

    return this.mapper.toDomain(saved);
  }

  async findAll(): Promise<ProductDomain[]> {
    await this.init();

    const repo = AppDataSource.getRepository(ProductEntity);
    const entities = await repo.find({ relations: ["categoria"] });

    return this.mapper.toDomainList(entities);
  }

  async findById(id: number): Promise<ProductDomain | null> {
    await this.init();

    const repo = AppDataSource.getRepository(ProductEntity);
    const entity = await repo.findOne({
      where: { id_producto: id },
      relations: ["categoria"]
    });

    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: number, data: ProductDomain): Promise<ProductDomain> {
    await this.init();

    const repo = AppDataSource.getRepository(ProductEntity);

    await repo.update({ id_producto: id }, data as any);

    const updated = await repo.findOne({
      where: { id_producto: id },
      relations: ["categoria"]
    });

    if (!updated) throw new Error("Producto no encontrado tras actualizar");

    return this.mapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.init();

    const repo = AppDataSource.getRepository(ProductEntity);

    // Soft delete (recomendado)
    await repo.update({ id_producto: id }, { visible: false });
  }
}