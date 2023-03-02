import { hash } from "bcrypt";
import request from "supertest";

import { app } from "../../../../../app";
import { prisma } from "../../../../../database/prismaClient";

describe("Find all deliveries deliveryma controller", () => {
  const username = "usernameTest";
  const password = "123456";
  beforeAll(async () => {
    const passwordHash = await hash(password, 10);
    await prisma.deliveryman.deleteMany({ where: {} });
    await prisma.deliveries.deleteMany({ where: {} });
    await prisma.deliveryman.create({
      data: {
        username,
        password: passwordHash,
      },
    });
  });

  it("Should be autheticaty and get all deliveries", async () => {
    const tokenDeliveryman = await request(app)
      .post("/deliveryman/authenticate")
      .send({ username, password });

    const response = await request(app)
      .get("/deliveryman/deliveries")
      .set({
        Authorization: `Bearer ${tokenDeliveryman.body}`,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body[0]).toHaveProperty("deliveries");
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("username");

    console.log(response.body);
  });
});
