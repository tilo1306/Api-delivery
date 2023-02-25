import { deliveryRoutes } from "./delivery.routes";
import { Router } from "express";
import { routesClient } from "./client.routes";

const routes = Router()

routes.use('/client', routesClient)
routes.use('/delivery', deliveryRoutes)
routes.use('/deliveryman', deliveryRoutes)

export { routes }