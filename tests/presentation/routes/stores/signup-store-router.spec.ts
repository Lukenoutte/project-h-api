import { ISignUpUserUseCase } from "domain/usecases/@interfaces/users-usecases.interfaces";
import { IRouter } from "presentation/routers/@interfaces/router.interfaces";
import SignUpStoreRouter from "presentation/routers/stores/signup-store-router";
import SignUpStoreUseCase from "domain/usecases/stores/signup-store-usecase";
import { Request } from "express";

describe("SignUpStoreRouter", () => {
  let signUpStoreRouter: IRouter;
  let signUpStoreUseCaseMock: ISignUpUserUseCase;

  const signUpStoreRepositoryMock = {
    execute: jest.fn(),
  };

  const mockRequest = (body: object): Partial<Request> => {
    const req: Partial<Request> = {
      body,
      params: {},
      query: {},
    };
    return req;
  };

  beforeEach(() => {
    const signUpStoreUseCaseMock = new SignUpStoreUseCase({
      signUpStoreRepository: signUpStoreRepositoryMock,
    });

    signUpStoreRouter = new SignUpStoreRouter({
      signUpStoreUseCase: signUpStoreUseCaseMock,
    });
  });

  describe("validate", () => {
    it("should return isValid true if validation passes", async () => {
      const body = {
        name: "Store Name",
        address: "123 Main Street",
        city: "Cityville",
        country: "Countryland",
      };
      if (signUpStoreRouter.validate) {
        const result = await signUpStoreRouter.validate(body);
        expect(result.isValid).toBe(true);
      } else fail("validate is not defined on signUpStoreRouter")
    });

    it("should return isValid false and error details if validation fails", async () => {
      const body = {
        name: "Store Name",
        address: "123 Main Street",
        city: null, // Invalid, as it's required
        country: "Countryland",
      };
      if (signUpStoreRouter.validate) {
        const result = await signUpStoreRouter.validate(body);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      } else fail("validate is not defined on signUpStoreRouter")
    });
  });

  describe("#route", () => {
    it("should return 400 Bad Request if validation fails", async () => {
      const body = {
        name: "Store Name",
        address: "123 Main Street",
        city: null, // Invalid, as it's required
        country: "Countryland",
      }
      const req = mockRequest(body) as Request
      const response = await signUpStoreRouter.route(req);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});
