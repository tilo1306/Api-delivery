import { ClientRepositoryInMemory } from "../../../repositories/in-memory/ClientRepositoryInMemory";
import { FindAllDeliveriesUseCase } from "../FindAllDeliveriesUseCase";

let findAllDeliveriesUseCase: FindAllDeliveriesUseCase;
let clientRepositoryInMemory: ClientRepositoryInMemory;

describe("Find all deliveries", () => {
  beforeEach(() => {
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    findAllDeliveriesUseCase = new FindAllDeliveriesUseCase(
      clientRepositoryInMemory
    );
  });

  it("should be find all deliveries", async () => {
    await clientRepositoryInMemory.create({
      username: "usernameTest",
      password: "passwordTest",
    });

    const result = await findAllDeliveriesUseCase.execute("0");

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("username");
    expect(result[0]).toHaveProperty("deliveries");
    expect(result[0].username).toEqual("usernameTest");
  });
});
