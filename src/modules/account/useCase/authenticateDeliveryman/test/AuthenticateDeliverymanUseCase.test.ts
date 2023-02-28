import { sign } from "jsonwebtoken";

import { AccountRepositoryInMemory } from "../../../repositories/in-memory/AccountRepositoryInMemory";
import { AuthenticateDeliverymanUseCase } from "../AuthenticateDeliverymanUseCase";

let accountRepositoryInMemory: AccountRepositoryInMemory;
let authenticateDeliverymanUseCase: AuthenticateDeliverymanUseCase;
describe("Authenticate deliveryman", () => {
  const username = "usernameTest";
  const password = "password";

  const token = sign({ username }, "019acc25a4e242bb55ad489832ada12d", {
    subject: "0",
    expiresIn: "1d",
  });

  beforeEach(() => {
    accountRepositoryInMemory = new AccountRepositoryInMemory();
    authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      accountRepositoryInMemory
    );
  });

  it("should be able to authenticate an deliveryman", async () => {
    await accountRepositoryInMemory.create({
      username,
      password,
    });

    const test = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    expect(test).toEqual(token);
  });

  it("should not be able to authenticate an nonexistent deliveryman", async () => {
    await expect(
      authenticateDeliverymanUseCase.execute({
        username: "erroUsername",
        password: "1234",
      })
    ).rejects.toEqual(new Error("Username or password invalid!"));
  });

  it("should not be able to authenticate with incorrect deliveryman", async () => {
    await accountRepositoryInMemory.create({
      username,
      password,
    });

    await expect(
      authenticateDeliverymanUseCase.execute({
        username,
        password: "password invalid",
      })
    ).rejects.toEqual(new Error("Username or password invalid!"));
  });
});
