/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";

import { prisma } from "../../../../database/prismaClient";
import { ICountDeliveryDTO } from "../../dtos/ICountDeliveryDTO";
import { IDeliveryRepository } from "../../repositories/IDeliveryRepository";

interface IUpdateEndData {
  id_delivery: string;
  id_deliveryman: string;
}

@injectable()
export class UpdateEndDateUseCase {
  constructor(
    @inject("DeliveryRepository")
    private deliveryRepository: IDeliveryRepository
  ) { }
  async execute({
    id_delivery,
    id_deliveryman,
  }: IUpdateEndData): Promise<ICountDeliveryDTO> {
    const result = await this.deliveryRepository.findByDeliveryupdateDeliveryDate({
      id_delivery,
      id_deliveryman
    })
    return result;
  }
}
