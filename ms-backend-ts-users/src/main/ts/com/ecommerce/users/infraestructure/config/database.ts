import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../Entity/UserEntity";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 14331,
  username: "sa",
  password: "123456",
  database: "nshoddies",
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  entities: [UserEntity],
  synchronize: false
});