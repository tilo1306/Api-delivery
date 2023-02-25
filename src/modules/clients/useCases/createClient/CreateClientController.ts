import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);
    const result = await createClientUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(result);
  }
}
