/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { IDeliveryRepository } from "../../repositories/IDeliveryRepository";

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

@injectable()
export class UpdateDeliverymanUseCase {
  constructor(
    @inject("DeliveryRepository")
    private deliveryRepository: IDeliveryRepository
  ) { }

  async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    const result = await this.deliveryRepository.findByDeliveryAddDeliveryman({ id_delivery, id_deliveryman })

    return result;
  }
}
