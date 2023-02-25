import { Clients } from "@prisma/client";

import { prisma } from "../../../../database/prismaClient";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { IClientRepository } from "../IClientRepository";

export class ClientRepository implements IClientRepository {
  create(data: ICreateClientDTO): Promise<void> {
    throw new Error("Method not implemented.");
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
}
