import { Request, Response } from "express";
import { findAllDeliveriesDeliverymanUseCase } from "./findAllDeliveriesDeliverymanUseCase";



export class FindAllDeliveriesDeliverymanController {
    async handle(request: Request, response: Response) {
        const { id_deliveryman } = request

        const findAllDeliveriesUseCase = new findAllDeliveriesDeliverymanUseCase()

        const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman)

        return response.json(deliveries)

    }
}