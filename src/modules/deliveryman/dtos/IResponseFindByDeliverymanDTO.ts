import { Deliveries } from "@prisma/client";

export interface IResponseFindByDeliverymanDTO {
  username: string;
  id: string;
  deliveries: Deliveries[];
}
