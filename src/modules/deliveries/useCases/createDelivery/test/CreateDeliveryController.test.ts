import { hash } from "bcrypt";
import request from "supertest";

import { app } from "../../../../../app";
import { prisma } from "../../../../../database/prismaClient";

describe("Create delivery controller", () => {
  const username = "usernameTest";
  const password = "passwordTest";

  beforeAll(async () => {
    const passwordHash = await hash(password, 10);

    await prisma.deliveries.deleteMany({ where: {} });
    await prisma.clients.deleteMany({ where: {} });
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

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("id_deliveryman");
    expect(response.body).toHaveProperty("id_client");
    expect(response.body).toHaveProperty("item_name");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("end_at");
  });
});
