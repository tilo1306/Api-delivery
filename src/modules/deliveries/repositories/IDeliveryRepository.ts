import { Deliveries } from "@prisma/client";

import { ICountDeliveryDTO } from "../dtos/ICountDeliveryDTO";
import { ICreateDeliveryDTO } from "../dtos/ICreateDeliveryDTO";
import { IUpdateDeliverymanDTO } from "../dtos/IUpdateDeliverymanDTO";
import { IUpdateDeliveryUpdateDTO } from "../dtos/IUpdateDeliveryUpdateDTO";

export interface IDeliveryRepository {
  create(data: ICreateDeliveryDTO): Promise<Deliveries>;
  findByAllDeliveryAvailable(): Promise<Deliveries[]>;
  findByDeliveryAddDeliveryman({
    id_delivery,
    id_deliveryman,
  }: IUpdateDeliverymanDTO): Promise<Deliveries>;
  findByDeliveryupdateDeliveryDate({
    id_delivery,
    id_deliveryman,
  }: IUpdateDeliveryUpdateDTO): Promise<ICountDeliveryDTO>;
}
