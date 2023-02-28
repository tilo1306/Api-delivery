import { sign } from "jsonwebtoken";

import { AccountRepositoryInMemory } from "../../../repositories/in-memory/AccountRepositoryInMemory";
import { AuthenticateClientUseCase } from "../AuthenticateClientUseCase";

let accountRepositoryInMemory: AccountRepositoryInMemory;
let authenticateClientUseCase: AuthenticateClientUseCase;
describe("Authenticate Client", () => {
  const username = "usernameTest";
  const password = "password";

  const token = sign({ username }, "019acc25a4e242bb55ad489832ada12d", {
    subject: "0",
    expiresIn: "1d",
  });

  beforeEach(() => {
    accountRepositoryInMemory = new AccountRepositoryInMemory();
    authenticateClientUseCase = new AuthenticateClientUseCase(
      accountRepositoryInMemory
    );
  });

  it("", async () => {
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
});
