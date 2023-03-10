import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);
    await createClientUseCase.execute({
      username,
      password,
    });

    return response.status(201).send();
  }
}
