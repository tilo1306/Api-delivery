import { hash } from "bcrypt";
import request from "supertest";

import { app } from "../../../../../app";
import { prisma } from "../../../../../database/prismaClient";

describe("Create delivery controller", () => {
  const username = "usernameTest";
  const password = "passwordTest";

  beforeAll(async () => {
    const passwordHash = await hash(password, 10);

    await prisma.clients.deleteMany({ where: {} });
    await prisma.deliveries.deleteMany({ where: {} });
    await prisma.deliveryman.deleteMany({ where: {} });

    await prisma.clients.create({
      data: {
        username,
        password: passwordHash,
      },
    });
  });

  it("should be create delivery", async () => {
    const responseToken = await request(app).post("/client/authenticate").send({
      username,
      password,
    });

    const response = await request(app)
      .post("/delivery")
      .send({ item_name: "pizza" })
      .set({
        Authorization: `Bearer ${responseToken.body}`,
      });

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("id_deliveryman");
    expect(response).toHaveProperty("id_client");
    expect(response).toHaveProperty("item_name");
    expect(response).toHaveProperty("created_at");
    expect(response).toHaveProperty("end_at");
  });
});
