/* eslint-disable prettier/prettier */
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "../../repositories/IAccountRepository";

interface IAuthenticateClient {
  username: string;
  password: string;
}

@injectable()
export class AuthenticateClientUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) { }

  async execute({ username, password }: IAuthenticateClient): Promise<string> {
    const client = await this.accountRepository.findByClient(username);

    if (!client) {
      throw new Error("Username or passsword invalid!");
    }

    const passswordMatch = await compare(password, client.password);

    if (!passswordMatch) {
      throw new Error("Username or passsword invalid!");
    }

    const token = sign({ username }, "019acc25a4e242bb55ad489832ada12d", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
