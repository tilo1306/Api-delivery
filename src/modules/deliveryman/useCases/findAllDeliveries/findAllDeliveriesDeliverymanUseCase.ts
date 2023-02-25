import { prisma } from "../../../../database/prismaClient";



export class findAllDeliveriesDeliverymanUseCase {
    async execute(id_deliveryman: string) {
        const deliveries = await prisma.deliveryman.findMany({
            where: { id: id_deliveryman, },
            select: {
                deliveries: true,
                id: true,
                username: true
            }
        })
        return deliveries
    }
}