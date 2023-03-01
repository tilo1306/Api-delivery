import { DeliveryRepositoryInMemory } from "../../../repositories/in-memory/DeliveryRepositoryInMemory";
import { UpdateEndDateUseCase } from "../UpdateEndDateUseCase";

let deliveryRepositoryInMemory: DeliveryRepositoryInMemory;
let updateEndDateUseCase: UpdateEndDateUseCase;

describe("Update End Date delivery", () => {
  beforeEach(() => {
    deliveryRepositoryInMemory = new DeliveryRepositoryInMemory();
    updateEndDateUseCase = new UpdateEndDateUseCase(deliveryRepositoryInMemory);
  });

  it("test", async () => {
    await deliveryRepositoryInMemory.create({
      id_client: "0",
      item_name: "pizza",
    });
    await deliveryRepositoryInMemory.findByDeliveryAddDeliveryman({
      id_delivery: "0",
      id_deliveryman: "",
    });

    const delivery = await updateEndDateUseCase.execute({
      id_delivery: "0",
      id_deliveryman: "1",
    });

    expect(delivery).toHaveProperty("count");
  });
});
