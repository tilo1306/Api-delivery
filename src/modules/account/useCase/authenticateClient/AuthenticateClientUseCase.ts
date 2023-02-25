import { compare } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { sign } from 'jsonwebtoken'
interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username or passsword invalid!")
        }

        const passswordMatch = await compare(password, client.passsword)


        if (!passswordMatch) {
            throw new Error("Username or passsword invalid!")
        }

        const token = sign({ username }, "019acc25a4e242bb55ad489832ada12d", {
            subject: client.id,
            expiresIn: '1d'
        })

        return token

    }
}