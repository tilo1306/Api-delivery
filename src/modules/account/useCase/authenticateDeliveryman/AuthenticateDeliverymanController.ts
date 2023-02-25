import { Request, Response } from "express";
import { AuthenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";



export class AuthenticateDeliverymanController {
    async handle(request: Request, response: Response) {
        const { username, password } = request.body

        const authenticateDeliveyman = new AuthenticateDeliverymanUseCase()
        const result = await authenticateDeliveyman.execute({
            username,
            password
        })

        return response.json(result)
    }
}