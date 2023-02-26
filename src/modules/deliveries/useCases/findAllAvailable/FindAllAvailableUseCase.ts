/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { IDeliveryRepository } from "../../repositories/IDeliveryRepository";

@injectable()
export class FindAllAvailableUseCase {
  constructor(
    @inject("DeliveryRepository")
    private deliveryRepository: IDeliveryRepository
  ) { }
  async execute() {
    const deliveries = this.deliveryRepository.findByAllDeliveryAvailable();
    return deliveries;
  }
}
