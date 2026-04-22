import { ProductDomain } from "../../domain/DTO/ProductDomain";
import { ProductEntity } from "../Entity/ProductEntity";

export interface IProductMapper {
  toDomain(entity: ProductEntity): ProductDomain;
  toEntity(domain: ProductDomain): ProductEntity;
  toDomainList(entities: ProductEntity[]): ProductDomain[];
}