export interface ProductAdapter {
  nombre: string;
  descripcion: string;
  marca: string;
  precio: number;
  talla: string;
  color: string;
  imagen_url?: string;
  stock: number;
  estado: string; // 'Disponible' | 'Agotado' | 'Inactivo'
  visible: boolean;
  id_categoria: number;
}