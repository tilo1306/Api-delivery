import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";

import { prisma } from "../../../../database/prismaClient";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { IClientRepository } from "../../repositories/IClientRepository";

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) { }

  async execute({ username, password }: ICreateClientDTO) {
    const clientExist = await this.clientRepository.findByUsername(username);

    if (clientExist) {
      throw new Error("Client already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });
    return client;
  }
}
