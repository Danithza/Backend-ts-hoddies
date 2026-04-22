import { UserAdapter } from "../DTO/UserAdapter";
import { UserDomain } from "../../../../domain/DTO/UserDomain";

export class UserAdapterMapper {

  static toDomain(adapter: UserAdapter): UserDomain {
    return {
      nombre: adapter.nombre,
      apellido: adapter.apellido,
      correo: adapter.correo,
      password: adapter.password,
      telefono: adapter.telefono,
      tipoDocumento: adapter.tipoDocumento,
      numeroDocumento: adapter.numeroDocumento,
      fechaNacimiento: new Date(adapter.fechaNacimiento),
      direccion: adapter.direccion,
      ciudad: adapter.ciudad,
      estadoCuenta: adapter.estadoCuenta,
      idRol: adapter.idRol
    };
  }

  static toResponse(domain: UserDomain): object {
    return {
      id: domain.id,
      nombre: domain.nombre,
      apellido: domain.apellido,
      correo: domain.correo,
      ciudad: domain.ciudad
    };
  }
}