/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { ICreateDeliveryDTO } from "../../dtos/ICreateDeliveryDTO";
import { IDeliveryRepository } from "../../repositories/IDeliveryRepository";

@injectable()
export class CreateDeliveryUseCase {
  constructor(
    @inject("DeliveryRepository")
    private deliveryRepository: IDeliveryRepository
  ) { }
  async execute({ id_client, item_name }: ICreateDeliveryDTO) {
    const delivery = await this.deliveryRepository.create({ id_client, item_name })

    return delivery;
  }
}
