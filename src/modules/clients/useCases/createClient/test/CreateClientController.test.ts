import request from "supertest";

import { app } from "../../../../../app";
import { prisma } from "../../../../../database/prismaClient";

describe("Create client controller", () => {
  const username = "usernameTest";
  const password = "123456";
  beforeAll(async () => {
    await prisma.deliveries.deleteMany({ where: {} });
    await prisma.clients.deleteMany({ where: {} });
    await prisma.deliveryman.deleteMany({ where: {} });
  });

  it("Should register a new client", async () => {
    const response = await request(app).post("/client").send({
      username,
      password,
    });
    expect(response.statusCode).toEqual(201);
  });

  it("should not be able to create a new client with username exists", async () => {
    await request(app).post("/client/").send({
      username,
      password,
    });

    const response = await request(app).post("/client").send({
      username,
      password,
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Username already exists");
  });
});
