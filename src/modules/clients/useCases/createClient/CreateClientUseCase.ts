/* eslint-disable prettier/prettier */
import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";

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
      throw new Error("Username already exists");
    }

    const hashPassword = await hash(password, 10);

    this.clientRepository.create({ username, password: hashPassword })
  }
}
