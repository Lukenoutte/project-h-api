import { ISignOutUseCase } from "domain/usecases/@interfaces/authentication-usecases.interfaces";
import { IRouterNoValidation } from "presentation/routers/@interfaces/router.interfaces";
import SignOutRouter from "presentation/routers/authentication/signout-router";
import { Request } from "express";

describe("SignOutRouter", () => {
  let signOutRouter: IRouterNoValidation;
  let signOutUseCaseMock: ISignOutUseCase;
  const deleteRefreshTokenRepositoryMock = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    signOutUseCaseMock = {
      deleteRefreshTokenRepository: deleteRefreshTokenRepositoryMock,
      execute: jest.fn(),
    };

    signOutRouter = new SignOutRouter({
      signOutUseCase: signOutUseCaseMock,
    });
  });

  const mockRequest = (userId: string): Partial<Request> => {
    const req: Partial<Request> = {
      body: {},
      params: {},
      query: {},
      userId
    };
    return req;
  };

  describe("#route", () => {
    it("should return 200 OK if sign-out is successful", async () => {
      const validHttpRequest = mockRequest("user123") as Request;
      const response = await signOutRouter.route(validHttpRequest);
      expect(response.statusCode).toBe(200);
    });

    it("should return 500 Internal Server Error for other errors", async () => {
      const validHttpRequest = mockRequest("user123") as Request;
      (signOutUseCaseMock.execute as jest.Mock).mockRejectedValue(new Error("Some error"));

      const response = await signOutRouter.route(validHttpRequest);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });
});
