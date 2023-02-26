import { Clients } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { IResponseFindByDeliveriesDTO } from "../../dtos/IResponseFindByDeliveriesDTO";
import { IClientRepository } from "../IClientRepository";

export class ClientRepository implements IClientRepository {
  async create({ password, username }: ICreateClientDTO): Promise<void> {
    await prisma.clients.create({
      data: {
        username,
        password,
      },
    });
  }
  async findByUsername(username: string): Promise<Clients | null> {
    const client = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    return client;
  }

  async findByDeliveries(
    id_client: string
  ): Promise<IResponseFindByDeliveriesDTO[]> {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: id_client,
      },
      select: {
        deliveries: true,
        id: true,
        username: true,
      },
    });

    return deliveries;
  }
}
