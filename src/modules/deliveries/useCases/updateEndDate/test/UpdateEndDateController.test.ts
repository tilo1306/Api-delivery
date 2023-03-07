import { hash } from "bcrypt";
import request from "supertest";

import { app } from "../../../../../app";
import { prisma } from "../../../../../database/prismaClient";

describe("Update Deliveryman controller", () => {
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

  it("should be update delivery available frrom deliveryman", async () => {
    const responseToken = await request(app)
      .post("/deliveryman/authenticate")
      .send({
        username,
        password,
      });

    const responseDelivery = await request(app)
      .get("/delivery/available")
      .set({
        Authorization: `Bearer ${responseToken.body}`,
      });

    const response = await request(app)
      .put(`/delivery/updateEndDate/${responseDelivery.body[0].id}`)
      .set({
        Authorization: `Bearer ${responseToken.body}`,
      });

    expect(response.body).toHaveProperty("count");
  });
});
