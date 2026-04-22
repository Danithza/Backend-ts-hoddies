import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CategoryEntity } from "./CategoryEntity";

@Entity({ name: "Producto" })
export class ProductEntity {

  @PrimaryGeneratedColumn({ name: "id_producto" })
  id_producto!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  marca!: string;

  @Column("decimal")
  precio!: number;

  @Column()
  talla!: string;

  @Column()
  color!: string;

  @Column({ name: "imagen_url", nullable: true })
  imagen_url!: string;

  @Column()
  stock!: number;

  @Column()
  estado!: string;

  @Column()
  visible!: boolean;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: "id_categoria" })
  categoria!: CategoryEntity;
}