import { container } from "tsyringe";

import { IAccountRepository } from "../../modules/account/repositories/IAccountRepository";
import { AccountRepository } from "../../modules/account/repositories/Implementation/AccountRepository";
import { IClientRepository } from "../../modules/clients/repositories/IClientRepository";
import { ClientRepository } from "../../modules/clients/repositories/Implementation/ClientRepository";
import { IDeliveryRepository } from "../../modules/deliveries/repositories/IDeliveryRepository";
import { DeliveryRepository } from "../../modules/deliveries/repositories/Implementation/DeliveryRepository";
import { IDeliverymanRepository } from "../../modules/deliveryman/repositories/IDeliverymanRepository";
import { DeliverymanRepository } from "../../modules/deliveryman/repositories/Implementation/DeliverymanRepository";

container.registerSingleton<IClientRepository>(
  "ClientRepository",
  ClientRepository
);

container.registerSingleton<IAccountRepository>(
  "AccountRepository",
  AccountRepository
);

container.registerSingleton<IDeliveryRepository>(
  "DeliveryRepository",
  DeliveryRepository
);

container.registerSingleton<IDeliverymanRepository>(
  "DeliverymanRepository",
  DeliverymanRepository
);
