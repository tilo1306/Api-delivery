import { Clients } from "@prisma/client";

import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { IResponseFindByDeliveriesDTO } from "../dtos/IResponseFindByDeliveriesDTO";

export interface IClientRepository {
  create(data: ICreateClientDTO): Promise<void>;
  findByUsername(username: string): Promise<Clients | null>;
  findByDeliveries(id_client: string): Promise<IResponseFindByDeliveriesDTO[]>;
}
