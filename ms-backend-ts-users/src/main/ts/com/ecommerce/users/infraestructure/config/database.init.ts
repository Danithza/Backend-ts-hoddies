import { AppDataSource } from "./database";

export const initDB = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("📦 DB conectada UNA SOLA VEZ");
  }
};