import { container } from "tsyringe";

import { IClientRepository } from "../../modules/clients/repositories/IClientRepository";
import { ClientRepository } from "../../modules/clients/repositories/implemetation/ClientRepository";

container.registerSingleton<IClientRepository>(
  "ClientRepository",
  ClientRepository
);
