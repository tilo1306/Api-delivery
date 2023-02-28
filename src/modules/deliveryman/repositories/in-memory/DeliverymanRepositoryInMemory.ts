import { Deliveryman } from "@prisma/client";
import { ICreateDeliverymanDTO } from "../../dtos/ICreateDeliverymanDTO";
import { IResponseFindByDeliverymanDTO } from "../../dtos/IResponseFindByDeliverymanDTO";
import { IDeliverymanRepository } from "../IDeliverymanRepository";


export class DeliverymanRepositoryInMemory implements IDeliverymanRepository {
    public deliverymans: Deliveryman[] = [];

    async create({ password, username }: ICreateDeliverymanDTO): Promise<void> {
        this.deliverymans.push({
            id: this.deliverymans.length.toString(),
            username,
            password,
        });
    }
    async findByUsername(username: string): Promise<Deliveryman | null> {
        const deliverymanUsername = this.deliverymans.find(
            (deliveryman) => deliveryman.username === username
        );

        if (!deliverymanUsername) {
            return null;
        }

        return deliverymanUsername;
    }
    async findByDeliveries(id_deliveryman: string): Promise<IResponseFindByDeliverymanDTO[]> {
        const clientDeliveries = [];

        const filterDeliveryman = this.deliverymans.filter(
            (deliveryman) => deliveryman.id === id_deliveryman
        );

        for (let index = 0; index < filterDeliveryman.length; index++) {
            clientDeliveries.push({
                id: filterDeliveryman[index].id,
                username: filterDeliveryman[index].username,
                deliveries: [],
            });
        }

        return clientDeliveries;
    }

}