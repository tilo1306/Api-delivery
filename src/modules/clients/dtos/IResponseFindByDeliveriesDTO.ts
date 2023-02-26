import { Deliveries } from "@prisma/client";

export interface IResponseFindByDeliveriesDTO {
  username: string;
  id: string;
  deliveries: Deliveries[];
}
