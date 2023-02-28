/* eslint-disable prettier/prettier */
import { injectable, inject } from "tsyringe";

import { IResponseFindByDeliveriesDTO } from "../../dtos/IResponseFindByDeliveriesDTO";
import { IClientRepository } from "../../repositories/IClientRepository";

@injectable()
export class FindAllDeliveriesUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) { }

  async execute(id_client: string): Promise<IResponseFindByDeliveriesDTO[]> {
    const deliveries = await this.clientRepository.findByDeliveries(id_client);
    return deliveries;
  }
}
