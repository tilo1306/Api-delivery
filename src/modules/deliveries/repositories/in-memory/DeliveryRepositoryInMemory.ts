import { Deliveries } from "@prisma/client";

import { ICountDeliveryDTO } from "../../dtos/ICountDeliveryDTO";
import { ICreateDeliveryDTO } from "../../dtos/ICreateDeliveryDTO";
import { IUpdateDeliverymanDTO } from "../../dtos/IUpdateDeliverymanDTO";
import { IUpdateDeliveryUpdateDTO } from "../../dtos/IUpdateDeliveryUpdateDTO";
import { IDeliveryRepository } from "../IDeliveryRepository";

export class DeliveryRepositoryInMemory implements IDeliveryRepository {
  public deliveries: Deliveries[] = [];

  async create({
    id_client,
    item_name,
  }: ICreateDeliveryDTO): Promise<Deliveries> {
    this.deliveries.push({
      id: this.deliveries.length.toString(),
      id_deliveryman: null,
      id_client,
      item_name,
      created_at: new Date(),
      end_at: null,
    });

    return this.deliveries.at(-1) as Deliveries;
  }
  async findByAllDeliveryAvailable(): Promise<Deliveries[]> {
    return this.deliveries.filter(
      (delivery) => delivery.end_at === null && delivery.id_deliveryman === null
    );
  }
  findByDeliveryAddDeliveryman({
    id_delivery,
    id_deliveryman,
  }: IUpdateDeliverymanDTO): Promise<Deliveries> {
    throw new Error("Method not implemented.");
  }
  findByDeliveryupdateDeliveryDate({
    id_delivery,
    id_deliveryman,
  }: IUpdateDeliveryUpdateDTO): Promise<ICountDeliveryDTO> {
    throw new Error("Method not implemented.");
  }
}
