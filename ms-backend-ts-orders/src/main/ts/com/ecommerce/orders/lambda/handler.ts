import express from "express";
import serverless from "serverless-http";

import { OrderController } from "../adapter/restfull/v1/controller/OrderController";
import { OrderImpl } from "../domain/OrderImpl";

const app = express();
app.use(express.json());

console.log("🚀 HANDLER: iniciando app");

const service = new OrderImpl();

const controller = new OrderController(service);

app.use("/orders", controller.router);


app.get("/ping", (req, res) => {
  res.json({ message: "OK" });
});


app.use((req, res, next) => {
  res.setTimeout(10000, () => {
    console.error("⏰ Request timeout");
    res.status(504).json({ error: "Timeout" });
  });
  next();
});

export const handler = serverless(app);