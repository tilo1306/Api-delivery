import { Clients, Deliveryman } from "@prisma/client";

export interface IAccountRepository {
  findByClient(username: string): Promise<Clients | null>;
  findByDeliveryman(username: string): Promise<Deliveryman | null>;
}
