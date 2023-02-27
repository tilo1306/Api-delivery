import { ClientRepositoryInMemory } from "../../../repositories/in-memory/ClientRepositoryInMemory";
import { CreateClientUseCase } from "../CreateClientUseCase";

let clientRepositoryInMemory: ClientRepositoryInMemory;
let createClientUseCase: CreateClientUseCase;

describe("Create Client", () => {
  beforeEach(() => {
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(clientRepositoryInMemory);
  });
  it("Should be able to create a new client", async () => {
    expect(async () => {
      await createClientUseCase.execute({
        username: "usernameTest",
        password: "passwordTest",
      });
    }).not.toThrow();
  });
  it("Should not be able to create a new client with exists username", async () => {
    await createClientUseCase.execute({
      username: "usernameTest",
      password: "passwordTest",
    });

    expect(async () => {
      await createClientUseCase.execute({
        username: "usernameTest",
        password: "passwordTest",
      });
    }).rejects.toEqual(new Error("Client already exists"));
  });
});
