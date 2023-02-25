import { Clients } from "@prisma/client";
import { ICreateClientDTO } from "../dtos/ICreateClientDTO";

export interface IClientRepository {
    create(data: ICreateClientDTO): Promise<void>
    findByUsername(username: string): Promise<Clients | null>
}