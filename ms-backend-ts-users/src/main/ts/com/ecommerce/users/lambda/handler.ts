import express from "express";
import serverless from "serverless-http";

import { initDB } from "../infraestructure/config/database.init"; 
import { UserController } from "../adapter/restfull/v1/controller/UserController";
import { UserImpl } from "../domain/UserImpl";
import { UserRepositoryImpl } from "../infraestructure/Repository/UserRepositoryImpl";
import { globalExceptionHandler } from "../adapter/restfull/v1/handler/GlobalExceptionHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const repo = new UserRepositoryImpl();
const service = new UserImpl(repo);
const controller = new UserController(service);

app.use("/users", controller.router);

// REGISTRAR EL ERROR HANDLER AL FINAL DE LAS RUTAS
app.use(globalExceptionHandler);

let isInitialized = false;
const serverlessHandler = serverless(app);

export const handler = async (event: unknown, context: { callbackWaitsForEmptyEventLoop?: boolean }) => {
  if (context && typeof context === "object") {
    context.callbackWaitsForEmptyEventLoop = false;
  }

  if (!isInitialized) {
    try {
      await initDB();
      isInitialized = true;
    } catch (error) {
      console.error("❌ Error en conexión de BD:", error);
    }
  }

  return await serverlessHandler(event as any, context);
};