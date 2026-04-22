import express from "express";
import serverless from "serverless-http";

import { OrderController } from "../adapter/restfull/v1/controller/OrderController";
import { OrderImpl } from "../domain/OrderImpl";
import { OrderUseCase } from "../application/OrderUseCase";

const app = express();
app.use(express.json());


const orderImpl = new OrderImpl();

const orderUseCase = new OrderUseCase(orderImpl);

const controller = new OrderController(orderUseCase);

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