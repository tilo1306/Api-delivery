import { DeliverymanRepositoryInMemory } from "../../../repositories/in-memory/DeliverymanRepositoryInMemory";
import { CreateDeliverymanUseCase } from "../CreateDeliverymanUseCase";

let deliverymanRepositoryInMemory: DeliverymanRepositoryInMemory;
let createDeliverymanClientUseCase: CreateDeliverymanUseCase;

describe("Create Client", () => {
  beforeEach(() => {
    deliverymanRepositoryInMemory = new DeliverymanRepositoryInMemory();
    createDeliverymanClientUseCase = new CreateDeliverymanUseCase(
      deliverymanRepositoryInMemory
    );
  });

  it("Should be able to create a new Deliveryman", async () => {
    expect(async () => {
      await createDeliverymanClientUseCase.execute({
        username: "usernameTest",
        password: "passwordTest",
      });
    }).not.toThrow();
  });

  it("Should not be able to create a new Deliveryman with exists username", async () => {
    await deliverymanRepositoryInMemory.create({
      username: "usernameTest",
      password: "passwordTest",
    });

    expect(async () => {
      await createDeliverymanClientUseCase.execute({
        username: "usernameTest",
        password: "passwordTest",
      });
    }).rejects.toEqual(new Error("Username already exists"));
  });
});
