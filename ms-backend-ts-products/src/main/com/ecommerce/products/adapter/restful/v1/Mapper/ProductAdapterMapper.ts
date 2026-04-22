import { ProductAdapter } from "../DTO/ProductAdapter";
import { ProductDomain } from "../../../../domain/DTO/ProductDomain";

export class ProductAdapterMapper {

  static toDomain(adapter: ProductAdapter): ProductDomain {
    return {
      nombre: adapter.nombre,
      descripcion: adapter.descripcion,
      marca: adapter.marca,
      precio: adapter.precio,
      talla: adapter.talla,
      color: adapter.color,
      imagen_url: adapter.imagen_url,
      stock: adapter.stock,
      estado: adapter.estado,
      visible: adapter.visible,
      id_categoria: adapter.id_categoria
    };
  }

  static toResponse(domain: ProductDomain): object {
    return {
      id: domain.id,
      nombre: domain.nombre,
      precio: domain.precio,
      stock: domain.stock,
      estado: domain.estado,
      visible: domain.visible
    };
  }
}