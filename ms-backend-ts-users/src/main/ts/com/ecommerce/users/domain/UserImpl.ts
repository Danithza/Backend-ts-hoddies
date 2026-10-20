import { IUser } from "../application/IUser";
import { UserDomain, UpdateUserDomain } from "./DTO/UserDomain";
import { IUserRepository } from "../infraestructure/Repository/IUserRepository";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET no está configurado en las variables de entorno");
}

export class UserImpl implements IUser {
  constructor(private repo: IUserRepository) {}

  async register(user: UserDomain): Promise<UserDomain> {
    user.password = await bcrypt.hash(user.password, 10);
    return this.repo.save(user);
  }

  async login(correo: string, password: string): Promise<string> {
    const user = await this.repo.findByCorreo(correo);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Contraseña incorrecta");
    }

    return jwt.sign({ correo: user.correo }, SECRET as string, { expiresIn: "1h" });
  }

  async getAll(): Promise<UserDomain[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<UserDomain> {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  async update(id: number, user: UpdateUserDomain): Promise<UserDomain> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return this.repo.update(id, user);
  }

async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}