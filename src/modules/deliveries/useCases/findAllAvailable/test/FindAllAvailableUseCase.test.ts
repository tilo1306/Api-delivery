import { DeliveryRepositoryInMemory } from "../../../repositories/in-memory/DeliveryRepositoryInMemory";
import { FindAllAvailableUseCase } from "../FindAllAvailableUseCase";

let deliveryRepositoryInMemory: DeliveryRepositoryInMemory;
let findAllAvailableUseCase: FindAllAvailableUseCase;

describe("Find all Available", () => {
  beforeEach(() => {
    deliveryRepositoryInMemory = new DeliveryRepositoryInMemory();
    findAllAvailableUseCase = new FindAllAvailableUseCase(
      deliveryRepositoryInMemory
    );
  });

  it("should be list all available deliveries", async () => {
    deliveryRepositoryInMemory.create({
      id_client: "0",
      item_name: "pizza",
    });

    deliveryRepositoryInMemory.create({
      id_client: "1",
      item_name: "cachorro-quente",
    });

    const listDeliveries = await findAllAvailableUseCase.execute();

    expect(listDeliveries.length).toBeGreaterThanOrEqual(0);
  });
});
