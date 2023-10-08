import requestSuperTest from "supertest";
import app from "../../../src/main/server";

describe("Testing create hotel route", () => {
  it("should return 200 when create hotel with correct params", async () => {
    const response = await requestSuperTest(app).post("/create/hotel", {
      name: "Dikaldas",
      address: "Rua das Flores",
      city: "São Paulo",
      country: "Brasil",
    });
    expect(response.status).toBe(200);
  });

  it("should return 400 when create hotel with missing params", async () => {
    const response = await requestSuperTest(app).post("/create/hotel", {
      address: "Rua das Flores",
      city: "São Paulo",
      country: "Brasil",
    });
    expect(response.status).toBe(400);
  });
});
