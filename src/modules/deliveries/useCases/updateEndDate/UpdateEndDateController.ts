import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

export class UpdateEndDateController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const updateEndaDateUseCase = container.resolve(UpdateEndDateUseCase);
    const delivery = await updateEndaDateUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return response.json(delivery);
  }
}
