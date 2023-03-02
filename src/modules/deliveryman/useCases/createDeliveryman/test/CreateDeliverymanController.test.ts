import request from "supertest";

import { app } from "../../../../../app";
import { prisma } from "../../../../../database/prismaClient";

describe("Create deliveryman controller", () => {
  const username = "usernameTest";
  const password = "123456";
  beforeAll(async () => {
    await prisma.deliveryman.deleteMany({ where: {} });
  });

  it("Should register a new deliveryman", async () => {
    const response = await request(app).post("/deliveryman").send({
      username,
      password,
    });

    expect(response.statusCode).toEqual(201);
  });

  it("should not be able to create a new deliveryman with username exists", async () => {
    await request(app).post("/deliveryman").send({
      username,
      password,
    });

    const response = await request(app).post("/deliveryman").send({
      username,
      password,
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Username already exists");
  });
});
