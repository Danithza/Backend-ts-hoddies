import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Categoria" })
export class CategoryEntity {

  @PrimaryGeneratedColumn({ name: "id_categoria" })
  id_categoria!: number;

  @Column({ name: "nombre_categoria" })
  nombre_categoria!: string;
}