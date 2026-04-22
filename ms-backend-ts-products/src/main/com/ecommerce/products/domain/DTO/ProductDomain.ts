export interface ProductDomain {
  id?: number;
  nombre: string;
  descripcion: string;
  marca: string;
  precio: number;
  talla: string;
  color: string;
  imagen_url?: string;
  stock: number;
  estado: string;
  visible: boolean;
  id_categoria: number;
}