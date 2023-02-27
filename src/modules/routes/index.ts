import { Router } from "express";

import { routesClient } from "./client.routes";
import { deliveryRoutes } from "./delivery.routes";

const routes = Router();

routes.use("/client", routesClient);
routes.use("/delivery", deliveryRoutes);
routes.use("/deliveryman", deliveryRoutes);

export { routes };
