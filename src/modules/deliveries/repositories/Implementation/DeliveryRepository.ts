import { Deliveries } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";
import { ICountDeliveryDTO } from "../../dtos/ICountDeliveryDTO";
import { ICreateDeliveryDTO } from "../../dtos/ICreateDeliveryDTO";
import { IUpdateDeliverymanDTO } from "../../dtos/IUpdateDeliverymanDTO";
import { IUpdateDeliveryUpdateDTO } from "../../dtos/IUpdateDeliveryUpdateDTO";
import { IDeliveryRepository } from "../IDeliveryRepository";

export class DeliveryRepository implements IDeliveryRepository {
  async create({
    id_client,
    item_name,
  }: ICreateDeliveryDTO): Promise<Deliveries> {
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        id_client,
      },
    });

    return delivery;
  }

  async findByAllDeliveryAvailable(): Promise<Deliveries[]> {
    const deliveries = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });
    return deliveries;
  }

  async findByDeliveryAddDeliveryman({
    id_delivery,
    id_deliveryman,
  }: IUpdateDeliverymanDTO): Promise<Deliveries> {
    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });
    return result;
  }

  async findByDeliveryupdateDeliveryDate({
    id_delivery,
    id_deliveryman,
  }: IUpdateDeliveryUpdateDTO): Promise<ICountDeliveryDTO> {
    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });
    return result;
  }
}
