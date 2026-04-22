import { IProductMapper } from "./IProductMapper";
import { ProductDomain } from "../../domain/DTO/ProductDomain";
import { ProductEntity } from "../Entity/ProductEntity";
import { CategoryEntity } from "../Entity/CategoryEntity";

export class ProductMapper implements IProductMapper {

  toDomain(entity: ProductEntity): ProductDomain {
    return {
      id: entity.id_producto,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      marca: entity.marca,
      precio: Number(entity.precio),
      talla: entity.talla,
      color: entity.color,
      imagen_url: entity.imagen_url,
      stock: entity.stock,
      estado: entity.estado,
      visible: entity.visible,
      id_categoria: entity.categoria?.id_categoria
    };
  }

  toEntity(domain: ProductDomain): ProductEntity {
    const e = new ProductEntity();
    e.id_producto = domain.id ?? 0;
    e.nombre = domain.nombre;
    e.descripcion = domain.descripcion;
    e.marca = domain.marca;
    e.precio = domain.precio;
    e.talla = domain.talla;
    e.color = domain.color;
    e.imagen_url = domain.imagen_url ?? "";
    e.stock = domain.stock;
    e.estado = domain.estado;
    e.visible = domain.visible;

    // relación con categoría
    const categoria = new CategoryEntity();
    categoria.id_categoria = domain.id_categoria;
    e.categoria = categoria;

    return e;
  }

  toDomainList(entities: ProductEntity[]): ProductDomain[] {
    return entities.map(e => this.toDomain(e));
  }
}