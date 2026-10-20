import { AppDataSource } from "../config/database"; 
import { UserEntity } from "../Entity/UserEntity";
import { IUserRepository } from "./IUserRepository";
import { UserMapper } from "../Mapper/UserMapper";
import { UserDomain, UpdateUserDomain } from "../../domain/DTO/UserDomain";

export class UserRepositoryImpl implements IUserRepository {

  private mapper = new UserMapper();

  async save(user: UserDomain): Promise<UserDomain> {
    const repo = AppDataSource.getRepository(UserEntity);

    const entity = this.mapper.toEntity(user);
    const saved = await repo.save(entity);

    return this.mapper.toDomain(saved);
  }

  async findByCorreo(correo: string): Promise<UserDomain | null> {
    const repo = AppDataSource.getRepository(UserEntity);

    const entity = await repo.findOneBy({ correo });

    return entity ? this.mapper.toDomain(entity) : null;
  }

  async findAll(): Promise<UserDomain[]> {
    const repo = AppDataSource.getRepository(UserEntity);

    const entities = await repo.find();

    return entities.map(e => this.mapper.toDomain(e));
  }

  async findById(id: number): Promise<UserDomain | null> {
    const repo = AppDataSource.getRepository(UserEntity);

    const entity = await repo.findOneBy({ id_usuario: id });

    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: number, data: UpdateUserDomain): Promise<UserDomain> {
    const repo = AppDataSource.getRepository(UserEntity);

    await repo.update({ id_usuario: id }, data as Partial<UserEntity>);

    const updated = await repo.findOneBy({ id_usuario: id });

    if (!updated) throw new Error("Usuario no encontrado tras actualizar");

    return this.mapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    const repo = AppDataSource.getRepository(UserEntity);

    await repo.update(
      { id_usuario: id },
      { estado_cuenta: "inactivo" }
    );
  }
}