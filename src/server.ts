/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { routes } from "./modules/routes/routes";
import swaggerFile from "./swagger.json";
import "./shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => console.log("Server is running"));
