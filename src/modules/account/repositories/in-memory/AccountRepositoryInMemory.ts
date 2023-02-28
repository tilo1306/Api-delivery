/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
import { Clients, Deliveryman } from "@prisma/client";
import { hash } from "bcrypt";

import { ICreateClientDTO } from "../../../clients/dtos/ICreateClientDTO";
import { IResponseFindByDeliveriesDTO } from "../../../clients/dtos/IResponseFindByDeliveriesDTO";
import { IClientRepository } from "../../../clients/repositories/IClientRepository";
import { IDeliverymanRepository } from "../../../deliveryman/repositories/IDeliverymanRepository";
import { IAccountRepository } from "../IAccountRepository";

export class AccountRepositoryInMemory
  implements IAccountRepository, IClientRepository, IDeliverymanRepository {
  public clientsOrDeliveryman: Clients[] = [];

  async create({ password, username }: ICreateClientDTO): Promise<void> {
    this.clientsOrDeliveryman.push({
      id: this.clientsOrDeliveryman.length.toString(),
      username,
      password: await hash(password, 10),
    });
  }
  async findByUsername(username: string): Promise<Clients | null> {
    const clientUsername = this.clientsOrDeliveryman.find(
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

    const filterClient = this.clientsOrDeliveryman.filter(
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
  async findByClient(username: string): Promise<Clients | null> {
    const clientUsername = this.clientsOrDeliveryman.find(
      (client) => client.username === username
    );

    if (!clientUsername) {
      return null;
    }

    return clientUsername;
  }
  async findByDeliveryman(username: string): Promise<Deliveryman | null> {
    const clientUsername = this.clientsOrDeliveryman.find(
      (client) => client.username === username
    );

    if (!clientUsername) {
      return null;
    }

    return clientUsername;
  }
}
