import { Deliveryman } from "@prisma/client";

import { ICreateDeliverymanDTO } from "../dtos/ICreateDeliverymanDTO";
import { IResponseFindByDeliverymanDTO } from "../dtos/IResponseFindByDeliverymanDTO";

export interface IDeliverymanRepository {
  create(data: ICreateDeliverymanDTO): Promise<void>;
  findByUsername(username: string): Promise<Deliveryman | null>;
  findByDeliveries(
    id_deliveryman: string
  ): Promise<IResponseFindByDeliverymanDTO[]>;
}
