import request from "supertest";

import { app } from "./app";

describe("Testing Api route", () => {
  it("testing status error 404 endpoint not found", async () => {
    const response = await request(app).get("/test");
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("endpoint not found");
  });
});
