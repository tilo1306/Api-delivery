/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";

import { IDeliverymanRepository } from "../../repositories/IDeliverymanRepository";

@injectable()
export class FindAllDeliveriesDeliverymanUseCase {
  constructor(
    @inject("DeliverymanRepository")
    private deliverymanRepository: IDeliverymanRepository
  ) { }
  async execute(id_deliveryman: string) {
    const deliveries = await this.deliverymanRepository.findByDeliveries(id_deliveryman)
    return deliveries;
  }
}
