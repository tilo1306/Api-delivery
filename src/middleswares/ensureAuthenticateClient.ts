import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

dotenv.config();

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.SECRET_KEY_CLIENT as string
    ) as IPayload;
    request.id_client = sub;
    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token!",
    });
  }
}
