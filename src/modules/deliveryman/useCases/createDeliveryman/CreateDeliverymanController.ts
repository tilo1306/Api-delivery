import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createDeliverymanUseCase = container.resolve(
      CreateDeliverymanUseCase
    );
    await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.status(201).send();
  }
}
