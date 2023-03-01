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
  async findByDeliveryAddDeliveryman({
    id_delivery,
    id_deliveryman,
  }: IUpdateDeliverymanDTO): Promise<Deliveries> {
    const filterDelivery = this.deliveries.find(
      (delivery) => delivery.id === id_delivery
    ) as Deliveries;
    filterDelivery.id_deliveryman = id_deliveryman;

    return filterDelivery;
  }
  async findByDeliveryupdateDeliveryDate({
    id_delivery,
    id_deliveryman,
  }: IUpdateDeliveryUpdateDTO): Promise<ICountDeliveryDTO> {
    const filterDelivery = this.deliveries.filter(
      (delivery) =>
        delivery.id === id_delivery &&
        delivery.id_deliveryman === id_deliveryman
    );

    return { count: filterDelivery.length };
  }
}
