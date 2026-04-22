import { UserDomain } from "../../domain/DTO/UserDomain";
import { UserEntity } from "../Entity/UserEntity";

export interface IUserMapper {
  toDomain(entity: UserEntity): UserDomain;
  toEntity(domain: UserDomain): UserEntity;
  toDomainList(entities: UserEntity[]): UserDomain[];
}