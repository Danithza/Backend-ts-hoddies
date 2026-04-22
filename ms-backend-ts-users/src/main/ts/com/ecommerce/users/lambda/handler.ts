import express from "express";
import serverless from "serverless-http";

import { initDB } from "../infraestructure/config/database.init"; // 👈 IMPORTANTE

import { UserController } from "../adapter/restfull/v1/controller/UserController";
import { UserImpl } from "../domain/UserImpl";
import { UserRepositoryImpl } from "../infraestructure/Repository/UserRepositoryImpl";

const app = express();
app.use(express.json());

// 🔹 DEPENDENCIAS (se crean una sola vez)
const repo = new UserRepositoryImpl();
const service = new UserImpl(repo);
const controller = new UserController(service);

// 🔹 ROUTES
app.use("/users", controller.router);

// 🔥 CONTROL DE INICIALIZACIÓN (CLAVE)
let isInitialized = false;

const bootstrap = async () => {
  if (!isInitialized) {
    console.log("🚀 Inicializando DB...");
    await initDB();
    isInitialized = true;
    console.log("✅ DB lista");
  }
};

// 🔹 EXPORT SERVERLESS (OPTIMIZADO)
export const handler = async (event: any, context: any) => {
  await bootstrap(); // 👈 SOLO SE EJECUTA UNA VEZ
  return serverless(app)(event, context);
};