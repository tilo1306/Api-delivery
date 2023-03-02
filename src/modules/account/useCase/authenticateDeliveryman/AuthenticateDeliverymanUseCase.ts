/* eslint-disable prettier/prettier */
import { compare } from "bcrypt";
import dotenv from 'dotenv'
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IAccountRepository } from "../../repositories/IAccountRepository";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}
dotenv.config()

@injectable()
export class AuthenticateDeliverymanUseCase {
  constructor(
    @inject("AccountRepository")
    private accountRepository: IAccountRepository
  ) { }
  async execute({ username, password }: IAuthenticateDeliveryman): Promise<string> {
    const deliveryman = await this.accountRepository.findByDeliveryman(
      username
    );

    if (!deliveryman) {
      throw new Error("Username or password invalid!");
    }

    const passswordMatch = await compare(password, deliveryman.password);

    if (!passswordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, process.env.SECRET_KEY_DELIVERYMAN as string, {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}
