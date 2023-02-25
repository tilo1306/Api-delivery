import { Router } from "express";

import { ensureAuthenticateClient } from "../../middleswares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "../../middleswares/ensureAuthenticateDeliveryman";
import { CreateDeliveryController } from "../deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "../deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "../deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "../deliveries/useCases/updateEndDate/UpdateEndDateController";

const deliveryRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

deliveryRoutes.post(
  "/",
  ensureAuthenticateClient,
  createDeliveryController.handle
);
deliveryRoutes.post(
  "/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);
deliveryRoutes.put(
  "/updateDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);
deliveryRoutes.put(
  "/updateEndDate/:id",
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);

export { deliveryRoutes };
