export class UserDomain {
  id?: number;
  nombre!: string;
  apellido!: string;
  correo!: string;
  password!: string;
  telefono!: string;
  tipoDocumento!: string;       
  numeroDocumento!: string;    
  fechaNacimiento!: Date;       
  direccion!: string;
  ciudad!: string;
  estadoCuenta!: string;      
  idRol!: number;              
}

export class UpdateUserDomain {
  nombre?: string;
  apellido?: string;
  correo?: string;
  password?: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  estado_cuenta?: string;
}