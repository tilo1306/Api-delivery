/* eslint-disable prettier/prettier */
import { compare } from "bcrypt";
import dotenv from 'dotenv'
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "../../repositories/IAccountRepository";

interface IAuthenticateClient {
  username: string;
  password: string;
}

dotenv.config()

@injectable()
export class AuthenticateClientUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) { }

  async execute({ username, password }: IAuthenticateClient): Promise<string> {
    const client = await this.accountRepository.findByClient(username);

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    const passswordMatch = await compare(password, client.password);

    if (!passswordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, process.env.SECRET_KEY_CLIENT as string, {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
