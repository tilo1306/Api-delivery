import { DeliveryRepositoryInMemory } from "../../../repositories/in-memory/DeliveryRepositoryInMemory";
import { CreateDeliveryUseCase } from "../CreateDeliveryUseCase";

let deliveryRepositoryInMemory: DeliveryRepositoryInMemory;
let createDeliveryUseCase: CreateDeliveryUseCase;

describe("Create Delivery", () => {
  beforeEach(() => {
    deliveryRepositoryInMemory = new DeliveryRepositoryInMemory();
    createDeliveryUseCase = new CreateDeliveryUseCase(
      deliveryRepositoryInMemory
    );
  });

  it("Should be able to create a new client", async () => {
    const newDelivery = await createDeliveryUseCase.execute({
      id_client: "0",
      item_name: "pizza",
    });

    expect(newDelivery).toHaveProperty("id");
    expect(newDelivery).toHaveProperty("id_deliveryman");
    expect(newDelivery).toHaveProperty("id_client");
    expect(newDelivery).toHaveProperty("item_name");
    expect(newDelivery).toHaveProperty("created_at");
    expect(newDelivery).toHaveProperty("end_at");
  });
});
