import { UserDomain, UpdateUserDomain } from "../domain/DTO/UserDomain";

export interface IUser {
  register(user: UserDomain): Promise<UserDomain>;
  login(correo: string, password: string): Promise<string>;
  getAll(): Promise<UserDomain[]>;
  getById(id: number): Promise<UserDomain | null>;
  update(id: number, data: UpdateUserDomain): Promise<UserDomain>;
  delete(id: number): Promise<void>;
}