import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllDeliveriesDeliverymanUseCase } from "./FindAllDeliveriesDeliverymanUseCase";

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;

    const findAllDeliveriesUseCase = container.resolve(
      FindAllDeliveriesDeliverymanUseCase
    );

    const deliveries = await findAllDeliveriesUseCase.execute(id_deliveryman);

    return response.json(deliveries);
  }
}
