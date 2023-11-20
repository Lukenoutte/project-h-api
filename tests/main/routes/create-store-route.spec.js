// import requestSuperTest from "supertest";
// import app from "../../../src/main/server";
// import PostgreHelper from "../../../src/infra/helpers/postgre-helper";

// describe("Testing create store route", () => {
//   beforeAll(async () => {
//     await PostgreHelper.connect(process.env.POSTGRE_URL);
//   });

//   afterAll(async () => {
//     await PostgreHelper.disconnect();
//   });

//   it("should return 201 when create store with correct params", async () => {
//     const response = await requestSuperTest(app).post("/create/store").send({
//       name: "Dikaldas",
//       address: "Rua das Flores",
//       city: "São Paulo",
//       country: "Brasil",
//     });
//     expect(response.status).toBe(201);
//   });

//   it("should return 400 when create store with missing params", async () => {
//     const response = await requestSuperTest(app).post("/create/store").send({
//       address: "Rua das Flores",
//       city: "São Paulo",
//       country: "Brasil",
//     });
//     expect(response.status).toBe(400);
//   });
// });
