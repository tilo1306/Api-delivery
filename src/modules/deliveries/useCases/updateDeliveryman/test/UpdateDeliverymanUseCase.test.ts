import { DeliveryRepositoryInMemory } from "../../../repositories/in-memory/DeliveryRepositoryInMemory";
import { UpdateDeliverymanUseCase } from "../UpdateDeliverymanUseCase";

let deliveryRepositoryInMemory: DeliveryRepositoryInMemory;
let updateDeliverymanUseCase: UpdateDeliverymanUseCase;

describe("Update Delivery", () => {
  beforeEach(() => {
    deliveryRepositoryInMemory = new DeliveryRepositoryInMemory();
    updateDeliverymanUseCase = new UpdateDeliverymanUseCase(
      deliveryRepositoryInMemory
    );
  });

  it("Should be update delivery from deliveryman", async () => {
    await deliveryRepositoryInMemory.create({
      id_client: "0",
      item_name: "pizza",
    });

    const update = await updateDeliverymanUseCase.execute({
      id_delivery: "0",
      id_deliveryman: "1",
    });

    expect(update).toHaveProperty("id");
    expect(update).toHaveProperty("id_deliveryman");
    expect(update).toHaveProperty("id_client");
    expect(update).toHaveProperty("item_name");
    expect(update).toHaveProperty("created_at");
    expect(update).toHaveProperty("end_at");
    expect(update.id_deliveryman).toEqual("1");
  });
});
