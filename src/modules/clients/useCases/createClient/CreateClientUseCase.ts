import { prisma } from '../../../../database/prismaClient'
import { hash } from 'bcrypt'
import { IClientRepository } from '../../repositories/IClientRepository';
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO';
import { injectable, inject } from 'tsyringe'

@injectable()
export class CreateClientUseCase {

    constructor(
        @inject("ClientRepository")
        private clientRepository: IClientRepository
    ) { }

    async execute({ username, password }: ICreateClientDTO) {
        const clientExist = await this.clientRepository.findByUsername(username)

        if (clientExist) {
            throw new Error("Client already exists")
        }

        const hashPassword = await hash(password, 10)

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })
        return client
    }
}