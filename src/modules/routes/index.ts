import { Router } from "express";

import { routesClient } from "./client.routes";
import { deliveryRoutes } from "./delivery.routes";
import { deliverymanRoutes } from "./deliveryman.routes";

const routes = Router();

routes.use("/client", routesClient);
routes.use("/delivery", deliveryRoutes);
routes.use("/deliveryman", deliverymanRoutes);

export { routes };
