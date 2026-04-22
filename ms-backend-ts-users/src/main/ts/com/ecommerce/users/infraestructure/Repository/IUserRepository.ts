import { UserDomain, UpdateUserDomain } from "../../domain/DTO/UserDomain";

export interface IUserRepository {
  save(user: UserDomain): Promise<UserDomain>;
  findByCorreo(correo: string): Promise<UserDomain | null>;
  findAll(): Promise<UserDomain[]>;
  findById(id: number): Promise<UserDomain | null>;
  update(id: number, data: UpdateUserDomain): Promise<UserDomain>;
  delete(id: number): Promise<void>;
}