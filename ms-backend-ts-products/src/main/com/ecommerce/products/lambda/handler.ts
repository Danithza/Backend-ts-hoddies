import express from "express";
import serverless from "serverless-http";

import { initDB } from "../config/database.init";// 👈 IMPORTANTE

import { ProductController } from "../adapter/restful/v1/controller/ProductController";
import { CategoryController } from "../adapter/restful/v1/controller/CategoryController";

import { ProductImpl } from "../domain/ProductImpl";
import { CategoryImpl } from "../domain/CategoryImpl";

import { ProductRepositoryImpl } from "../infraestructure/Repository/ProductRepositoryImpl";
import { CategoryRepositoryImpl } from "../infraestructure/Repository/CategoryRepositoryImpl";

const app = express();
app.use(express.json());

// 🔥 PROMESA GLOBAL PARA EVITAR MULTIPLES CONEXIONES
let dbReady: Promise<void> | null = null;

const ensureDB = async () => {
  if (!dbReady) {
    dbReady = initDB();
  }
  return dbReady;
};

// 🔹 PRODUCTS
const productRepo = new ProductRepositoryImpl();
const productService = new ProductImpl(productRepo);
const productController = new ProductController(productService);

// 🔹 CATEGORIES
const categoryRepo = new CategoryRepositoryImpl();
const categoryService = new CategoryImpl(categoryRepo);
const categoryController = new CategoryController(categoryService);

// 🔹 ROUTES
app.use("/products", productController.router);
app.use("/categories", categoryController.router);

// 🔥 WRAPPER DEL HANDLER
const server = serverless(app);

export const handler = async (event: any, context: any) => {
  await ensureDB(); // 👈 se ejecuta UNA sola vez correctamente
  return server(event, context);
};