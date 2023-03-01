import { DeliverymanRepositoryInMemory } from "../../../repositories/in-memory/DeliverymanRepositoryInMemory";
import { FindAllDeliveriesDeliverymanUseCase } from "../FindAllDeliveriesDeliverymanUseCase";

let findAllDeliveriesDeliverymanUseCase: FindAllDeliveriesDeliverymanUseCase;
let deliverymanRepositoryInMemory: DeliverymanRepositoryInMemory;

describe("Find all deliveries from Deliveryman", () => {
  beforeEach(() => {
    deliverymanRepositoryInMemory = new DeliverymanRepositoryInMemory();
    findAllDeliveriesDeliverymanUseCase =
      new FindAllDeliveriesDeliverymanUseCase(deliverymanRepositoryInMemory);
  });

  it("should be find all deliveries", async () => {
    await deliverymanRepositoryInMemory.create({
      username: "usernameTest",
      password: "passwordTest",
    });

    const result = await findAllDeliveriesDeliverymanUseCase.execute("0");

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("username");
    expect(result[0]).toHaveProperty("deliveries");
    expect(result[0].username).toEqual("usernameTest");
  });
});
