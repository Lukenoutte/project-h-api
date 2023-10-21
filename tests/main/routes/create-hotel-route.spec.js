import requestSuperTest from "supertest";
import app from "../../../src/main/server";

describe("Testing create hotel route", () => {
  it("should return 201 when create hotel with correct params", async () => {
    const response = await requestSuperTest(app).post("/create/hotel").send({
      name: "Dikaldas",
      address: "Rua das Flores",
      city: "São Paulo",
      country: "Brasil",
    });
    expect(response.status).toBe(201);
  });

  it("should return 400 when create hotel with missing params", async () => {
    const response = await requestSuperTest(app).post("/create/hotel").send({
      address: "Rua das Flores",
      city: "São Paulo",
      country: "Brasil",
    });
    expect(response.status).toBe(400);
  });
});
