import { Router } from "express";

import { ensureAuthenticateDeliveryman } from "../../middleswares/ensureAuthenticateDeliveryman";
import { AuthenticateDeliverymanController } from "../account/useCase/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateDeliverymanController } from "../deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "../deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";

const deliverymanRoutes = Router();

const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliverymanController = new CreateDeliverymanController();
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();

deliverymanRoutes.post("/", createDeliverymanController.handle);
deliverymanRoutes.post(
  "/authenticate",
  authenticateDeliverymanController.handle
);
deliverymanRoutes.get(
  "/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle
);

export { deliverymanRoutes };
