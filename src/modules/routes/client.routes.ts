import { Router } from "express";

import { ensureAuthenticateClient } from "../../middleswares/ensureAuthenticateClient";
import { AuthenticateClientController } from "../account/useCase/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "../clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "../clients/useCases/deliveries/FindAllDeliveriesController";

const routesClient = Router();

const authenticateClientController = new AuthenticateClientController();
const createClientController = new CreateClientController();
const findAllDeliveryControler = new FindAllDeliveriesController();

routesClient.post("/", createClientController.handle);
routesClient.post("/authenticate", authenticateClientController.handle);
routesClient.get(
  "/deliveries",
  ensureAuthenticateClient,
  findAllDeliveryControler.handle
);

export { routesClient };
