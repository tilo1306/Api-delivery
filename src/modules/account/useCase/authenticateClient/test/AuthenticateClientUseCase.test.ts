import dotenv from "dotenv";
import { sign } from "jsonwebtoken";

import { AccountRepositoryInMemory } from "../../../repositories/in-memory/AccountRepositoryInMemory";
import { AuthenticateClientUseCase } from "../AuthenticateClientUseCase";

let accountRepositoryInMemory: AccountRepositoryInMemory;
let authenticateClientUseCase: AuthenticateClientUseCase;

dotenv.config();
describe("Authenticate Client", () => {
  const username = "usernameTest";
  const password = "password";

  const token = sign({ username }, process.env.SECRET_KEY_CLIENT as string, {
    subject: "0",
    expiresIn: "1d",
  });

  beforeEach(() => {
    accountRepositoryInMemory = new AccountRepositoryInMemory();
    authenticateClientUseCase = new AuthenticateClientUseCase(
      accountRepositoryInMemory
    );
  });

  it("should be able to authenticate an client", async () => {
    await accountRepositoryInMemory.create({
      username,
      password,
    });

    const test = await authenticateClientUseCase.execute({
      username,
      password,
    });

    expect(test).toEqual(token);
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateClientUseCase.execute({
        username: "erroUsername",
        password: "1234",
      })
    ).rejects.toEqual(new Error("Username or password invalid!"));
  });

  it("should not be able to authenticate with incorrect client", async () => {
    await accountRepositoryInMemory.create({
      username,
      password,
    });

    await expect(
      authenticateClientUseCase.execute({
        username,
        password: "password invalid",
      })
    ).rejects.toEqual(new Error("Username or password invalid!"));
  });
});
