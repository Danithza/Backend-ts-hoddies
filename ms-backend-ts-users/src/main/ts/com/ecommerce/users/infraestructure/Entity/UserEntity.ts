import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Usuario" })
export class UserEntity {

  @PrimaryGeneratedColumn({ name: "id_usuario" })
  id_usuario!: number;

  @Column() nombre!: string;
  @Column() apellido!: string;
  @Column() correo!: string;
  @Column({ name: "password" }) password!: string;

  @Column() telefono!: string;
  @Column({ name: "tipo_documento" }) tipo_documento!: string;
  @Column({ name: "numero_documento" }) numero_documento!: string;
  @Column({ name: "fecha_nacimiento" }) fecha_nacimiento!: Date;
  @Column() direccion!: string;
  @Column() ciudad!: string;
  @Column({ name: "estado_cuenta" }) estado_cuenta!: string;
  @Column({ name: "id_rol" }) id_rol!: number;
}