import { IUser } from "../application/IUser";
import { UserDomain, UpdateUserDomain } from "./DTO/UserDomain";
import { IUserRepository } from "../infraestructure/Repository/IUserRepository";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const SECRET = "SUPER_SECRET";

export class UserImpl implements IUser {
   constructor(private repo: IUserRepository) {}

  async register(user: UserDomain): Promise<UserDomain> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.repo.save(user);
  }

  async login(correo: string, password: string): Promise<string> {
    const user = await this.repo.findByCorreo(correo);
    if (!user) throw new Error("Usuario no encontrado");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Contraseña incorrecta");
    return jwt.sign({ id: user.id, correo: user.correo }, SECRET, { expiresIn: "1d" });
  }

  async getAll(): Promise<UserDomain[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<UserDomain | null> {
    return this.repo.findById(id);
  }

  async update(id: number, data: UpdateUserDomain): Promise<UserDomain> {
    const exists = await this.repo.findById(id);
    if (!exists) throw new Error("Usuario no encontrado");
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.repo.update(id, data);
  }

async delete(id: number): Promise<void> {
  const exists = await this.repo.findById(id);
  if (!exists) throw new Error("Usuario no encontrado");
  await this.repo.delete(id); 
}
}