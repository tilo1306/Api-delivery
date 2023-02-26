import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const updateDeliverymanUseCase = container.resolve(
      UpdateDeliverymanUseCase
    );
    const delivery = await updateDeliverymanUseCase.execute({
      id_deliveryman,
      id_delivery,
    });

    return response.json(delivery);
  }
}
