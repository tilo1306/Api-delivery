import { Deliveryman } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";
import { ICreateDeliverymanDTO } from "../../dtos/ICreateDeliverymanDTO";
import { IResponseFindByDeliverymanDTO } from "../../dtos/IResponseFindByDeliverymanDTO";
import { IDeliverymanRepository } from "../IDeliverymanRepository";

export class DeliverymanRepository implements IDeliverymanRepository {
  async create({ password, username }: ICreateDeliverymanDTO): Promise<void> {
    await prisma.deliveryman.create({
      data: {
        username,
        password,
      },
    });
  }
  async findByUsername(username: string): Promise<Deliveryman | null> {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    return deliverymanExist;
  }
  async findByDeliveries(
    id_deliveryman: string
  ): Promise<IResponseFindByDeliverymanDTO[]> {
    const deliveries = await prisma.deliveryman.findMany({
      where: { id: id_deliveryman },
      select: {
        deliveries: true,
        id: true,
        username: true,
      },
    });
    return deliveries;
  }
}
