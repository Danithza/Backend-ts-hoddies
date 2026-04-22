import "reflect-metadata";
import { DataSource } from "typeorm";
import { ProductEntity } from "../infraestructure/Entity/ProductEntity";
import { CategoryEntity } from "../infraestructure/Entity/CategoryEntity";

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
  entities: [ProductEntity, CategoryEntity],
  synchronize: false
});