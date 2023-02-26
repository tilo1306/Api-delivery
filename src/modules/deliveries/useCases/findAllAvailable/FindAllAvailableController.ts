import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";

export class FindAllAvailableController {
  async handle(request: Request, response: Response) {
    const findAllAvailableUseCase = container.resolve(FindAllAvailableUseCase);

    const deliveries = await findAllAvailableUseCase.execute();

    return response.json(deliveries);
  }
}
