import express from "express";
import serverless from "serverless-http";

import { initDB } from "../infraestructure/config/database.init"; 

import { UserController } from "../adapter/restfull/v1/controller/UserController";
import { UserImpl } from "../domain/UserImpl";
import { UserRepositoryImpl } from "../infraestructure/Repository/UserRepositoryImpl";

const app = express();
app.use(express.json());

const repo = new UserRepositoryImpl();
const service = new UserImpl(repo);
const controller = new UserController(service);

app.use("/users", controller.router);

let isInitialized = false;

const bootstrap = async () => {
  if (!isInitialized) {
    console.log("Inicializando DB...");
    await initDB();
    isInitialized = true;
    console.log("DB lista");
  }
};

export const handler = async (event: unknown, context: unknown) => {
  console.log("Entró al handler");

  await bootstrap();

  console.log(" Bootstrap terminado");

  return serverless(app)(event as Record<string, unknown>, context as Record<string, unknown>);
};