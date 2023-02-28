import { Clients, Deliveryman } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";
import { IAccountRepository } from "../IAccountRepository";

export class AccountRepository implements IAccountRepository {
  async findByClient(username: string): Promise<Clients | null> {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });
    return client;
  }

  async findByDeliveryman(username: string): Promise<Deliveryman | null> {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });
    return deliveryman;
  }
}
