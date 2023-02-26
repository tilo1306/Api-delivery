/* eslint-disable prettier/prettier */
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateDeliverymanDTO } from "../../dtos/ICreateDeliverymanDTO";
import { IDeliverymanRepository } from "../../repositories/IDeliverymanRepository";

@injectable()
export class CreateDeliverymanUseCase {
  constructor(
    @inject("DeliverymanRepository")
    private deliverymanRepository: IDeliverymanRepository
  ) { }

  async execute({ username, password }: ICreateDeliverymanDTO): Promise<void> {
    const deliverymanExist = await this.deliverymanRepository.findByUsername(username)

    if (deliverymanExist) {
      throw new Error("Client already exists");
    }

    const hashPassword = await hash(password, 10);

    await this.deliverymanRepository.create({ username, password: hashPassword })

  }
}
