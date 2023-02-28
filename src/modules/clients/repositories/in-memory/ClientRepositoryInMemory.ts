/* eslint-disable no-plusplus */
import { Clients } from "@prisma/client";
import { hash } from "bcrypt";

import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { IResponseFindByDeliveriesDTO } from "../../dtos/IResponseFindByDeliveriesDTO";
import { IClientRepository } from "../IClientRepository";

export class ClientRepositoryInMemory implements IClientRepository {
  public clients: Clients[] = [];

  async create({ password, username }: ICreateClientDTO): Promise<void> {
    this.clients.push({
      id: this.clients.length.toString(),
      username,
      password: await hash(password, 10),
    });
  }
  async findByUsername(username: string): Promise<Clients | null> {
    const clientUsername = this.clients.find(
      (client) => client.username === username
    );

    if (!clientUsername) {
      return null;
    }

    return clientUsername;
  }
  async findByDeliveries(
    id_client: string
  ): Promise<IResponseFindByDeliveriesDTO[]> {
    const clientDeliveries = [];

    const filterClient = await this.clients.filter(
      (client) => client.id === id_client
    );

    for (let index = 0; index < filterClient.length; index++) {
      clientDeliveries.push({
        id: filterClient[index].id,
        username: filterClient[index].username,
        deliveries: [],
      });
    }

    return clientDeliveries;
  }
}
