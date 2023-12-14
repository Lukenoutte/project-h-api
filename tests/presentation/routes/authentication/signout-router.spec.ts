import SignOutRouter from "presentation/routers/authentication/signout-router";

describe("SignOutRouter", () => {
  let signOutRouter;
  let signOutUseCaseMock;

  beforeEach(() => {
    signOutUseCaseMock = {
      execute: jest.fn(),
    };

    signOutRouter = new SignOutRouter({
      signOutUseCase: signOutUseCaseMock,
    });
  });

  describe("#route", () => {
    it("should return 500 Bad Request if the request is invalid", async () => {
      const invalidHttpRequest = null;

      const response = await signOutRouter.route(invalidHttpRequest);

      expect(response.statusCode).toBe(500);
    });

    it("should return 200 OK if sign-out is successful", async () => {
      const validHttpRequest = {
        userId: "user123",
        body: {},
      };

      signOutUseCaseMock.execute.mockResolvedValue();

      const response = await signOutRouter.route(validHttpRequest);
      expect(response.statusCode).toBe(200);
    });

    it("should return 500 Internal Server Error for other errors", async () => {
      const validHttpRequest = {
        userId: "user123",
      };

      signOutUseCaseMock.execute.mockRejectedValue(new Error("Some error"));

      const response = await signOutRouter.route(validHttpRequest);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });
});
