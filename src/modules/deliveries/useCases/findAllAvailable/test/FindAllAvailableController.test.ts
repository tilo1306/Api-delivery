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
        id: "0",
        username,
        password: passwordHash,
      },
    });

    await prisma.deliveryman.create({
      data: {
        username,
        password: passwordHash,
      },
    });
    await prisma.deliveries.createMany({
      data: [
        { id_client: "0", item_name: "Pizza" },
        { id_client: "0", item_name: "Mc" },
        { id_client: "0", item_name: "Sorvete" },
        { id_client: "0", item_name: "Cerveja" },
        { id_client: "0", item_name: "Porção" },
      ],
    });
  });

  it("should be find all delivery available", async () => {
    const responseToken = await request(app)
      .post("/deliveryman/authenticate")
      .send({
        username,
        password,
      });

    const response = await request(app)
      .get("/delivery/available")
      .set({
        Authorization: `Bearer ${responseToken.body}`,
      });

    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("id_deliveryman");
    expect(response.body[0]).toHaveProperty("id_client");
    expect(response.body[0]).toHaveProperty("item_name");
    expect(response.body[0]).toHaveProperty("created_at");
    expect(response.body[0]).toHaveProperty("end_at");
  });
});
