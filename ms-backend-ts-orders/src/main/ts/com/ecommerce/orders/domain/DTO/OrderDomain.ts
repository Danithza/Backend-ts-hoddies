export interface PersonasDomain {
  id?: number;
  nombre?: string;
  correo?: string;
}

export interface ProductosDomain {
  cantidad: number;
  descuento: number;
  subTotal?: number;
  total?: number;
  idProducto: number;
}

export interface OrderDomain {
  id?: number;
  persona: PersonasDomain;
  producto: ProductosDomain;
}