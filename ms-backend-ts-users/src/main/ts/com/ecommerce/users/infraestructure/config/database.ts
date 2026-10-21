import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../Entity/UserEntity";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "127.0.0.1", // Usar IPv4 explícitamente para evitar problemas de resolución con 'localhost'
  port: 14331,
  username: "sa",
  password: "123456",
  database: "nshoddies",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectTimeout: 5000 // 5 segundos de límite para conectar
  },
  extra: {
    connectionTimeout: 5000,
    requestTimeout: 5000
  },
  entities: [UserEntity],
  synchronize: false
});