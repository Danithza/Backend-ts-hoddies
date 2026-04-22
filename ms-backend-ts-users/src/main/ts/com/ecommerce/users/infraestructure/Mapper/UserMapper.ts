import { IUserMapper } from "./IUserMapper";
import { UserDomain } from "../../domain/DTO/UserDomain";
import { UserEntity } from "../Entity/UserEntity";

export class UserMapper implements IUserMapper {

  toDomain(entity: UserEntity): UserDomain {
    return {
      id: entity.id_usuario,
      nombre: entity.nombre,
      apellido: entity.apellido,
      correo: entity.correo,
      password: entity.password,
      telefono: entity.telefono,
      tipoDocumento: entity.tipo_documento,
      numeroDocumento: entity.numero_documento,
      fechaNacimiento: entity.fecha_nacimiento,
      direccion: entity.direccion,
      ciudad: entity.ciudad,
      estadoCuenta: entity.estado_cuenta,
      idRol: entity.id_rol
    };
  }

  toEntity(domain: UserDomain): UserEntity {
    const e = new UserEntity();
    e.nombre = domain.nombre;
    e.apellido = domain.apellido;
    e.correo = domain.correo;
    e.password = domain.password;
    e.telefono = domain.telefono || "";
    e.tipo_documento = domain.tipoDocumento;
    e.numero_documento = domain.numeroDocumento;
    e.fecha_nacimiento = domain.fechaNacimiento;
    e.direccion = domain.direccion;
    e.ciudad = domain.ciudad;
    e.estado_cuenta = domain.estadoCuenta;
    e.id_rol = domain.idRol;
    return e;
  }

  toDomainList(entities: UserEntity[]): UserDomain[] {
    return entities.map(e => this.toDomain(e));
  }
}