import { compare } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { sign } from 'jsonwebtoken'
interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (!deliveryman) {
            throw new Error("Username or passsword invalid!")
        }

        const passswordMatch = await compare(password, deliveryman.passsword)


        if (!passswordMatch) {
            throw new Error("Username or passsword invalid!")
        }

        const token = sign({ username }, "019acc25a4e242bb55ad489832ada12d", {
            subject: deliveryman.id,
            expiresIn: '1d'
        })

        return token

    }
}