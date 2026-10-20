import { AppDataSource } from "./database";

export const initDB = async () => {
  if (!AppDataSource.isInitialized) {
    console.log("🔌 Intentando conectar a SQL Server...");

    await AppDataSource.initialize();

    console.log("📦 DB conectada UNA SOLA VEZ");
  }
};