import { Deliveryman } from "@prisma/client";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import request from "supertest";

import { app } from "../../../../../app";
import { prisma } from "../../../../../database/prismaClient";

describe("Authenticate deliveryman", () => {
  const username = "usernameTest";
  const password = "testPassword";

  beforeAll(async () => {
    const passwordHash = await hash(password, 10);

    await prisma.deliveryman.deleteMany({ where: {} });
    await prisma.deliveryman.create({
      data: {
        username,
        password: passwordHash,
      },
    });
  });

  it("should be able to authenticate an deliveryman ", async () => {
    const deliveryman = (await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    })) as Deliveryman;

    const response = await request(app).post("/deliveryman/authenticate").send({
      username,
      password,
    });

    const token = sign(
      { username },
      process.env.SECRET_KEY_DELIVERYMAN as string,
      {
        subject: deliveryman.id,
        expiresIn: "1d",
      }
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(token);
  });

  it("should not be able to authenticate an nonexistent username", async () => {
    const response = await request(app).post("/deliveryman/authenticate").send({
      username: "usernameError",
      password,
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Username or password invalid!");
  });

  it("should not be able to authenticate an password invalid", async () => {
    const response = await request(app).post("/deliveryman/authenticate").send({
      username,
      password: "passwordInvalid",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Username or password invalid!");
  });
});
