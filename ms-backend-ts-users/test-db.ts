import "reflect-metadata";
import { AppDataSource } from "./src/main/ts/com/ecommerce/users/infraestructure/config/database";

async function testConnection() {
  console.log("⏳ Intentando conectar a SQL Server en el puerto 14331...");
  try {
    await AppDataSource.initialize();
    console.log("✅ Conexión exitosa a la base de datos.");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
}

testConnection();