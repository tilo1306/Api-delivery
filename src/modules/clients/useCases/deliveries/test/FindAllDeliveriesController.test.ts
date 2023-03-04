import { hash } from "bcrypt";
import request from "supertest";

import { app } from "../../../../../app";
import { prisma } from "../../../../../database/prismaClient";

describe("Find all deliveries controller", () => {
  const username = "usernameTest";
  const password = "123456";
  beforeAll(async () => {
    const passwordHash = await hash(password, 10);
    await prisma.clients.deleteMany({ where: {} });
    await prisma.deliveries.deleteMany({ where: {} });
    await prisma.clients.create({
      data: {
        username,
        password: passwordHash,
      },
    });
  });

  it("Should be autheticaty and get all deliveries", async () => {
    const tokenClient = await request(app)
      .post("/client/authenticate")
      .send({ username, password });

    const response = await request(app)
      .get("/client/deliveries")
      .set({
        Authorization: `Bearer ${tokenClient.body}`,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body[0]).toHaveProperty("deliveries");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("username");
  });

  it("Should be not autheticaty ", async () => {
    const response = await request(app)
      .get("/client/deliveries")
      .set({
        Authorization: `Bearer ${"tokenError"}}`,
      });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Invalid token!");
  });

  it("Should be not autheticaty error invalid token", async () => {
    const response = await request(app).get("/client/deliveries").set({
      Authorization: ``,
    });
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Token missing");
  });
});
