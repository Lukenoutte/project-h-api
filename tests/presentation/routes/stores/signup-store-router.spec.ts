import { ISignUpUserUseCase } from "domain/usecases/@interfaces/users-usecases.interfaces";
import { IRouter } from "presentation/routers/@interfaces/router.interfaces";
import SignUpStoreRouter from "presentation/routers/stores/signup-store-router";

describe("SignUpStoreRouter", () => {
  let signUpStoreRouter: IRouter;
  let signUpStoreUseCaseMock: ISignUpUserUseCase;

  beforeEach(() => {
    signUpStoreUseCaseMock = {
      execute: jest.fn(),
    };

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

      const result = await signUpStoreRouter.validate(body);

      expect(result.isValid).toBe(true);
    });

    it("should return isValid false and error details if validation fails", async () => {
      const body = {
        name: "Store Name",
        address: "123 Main Street",
        city: null, // Invalid, as it's required
        country: "Countryland",
      };

      const result = await signUpStoreRouter.validate(body);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("#route", () => {
    it("should return 400 Bad Request if the request is invalid", async () => {
      const invalidHttpRequest = null;

      const response = await signUpStoreRouter.route(invalidHttpRequest);

      expect(response.statusCode).toBe(500);
    });

    it("should return 400 Bad Request if validation fails", async () => {
      const invalidHttpRequest = {
        body: {
          name: "Store Name",
          address: "123 Main Street",
          city: null, // Invalid, as it's required
          country: "Countryland",
        },
      };

      const response = await signUpStoreRouter.route(invalidHttpRequest);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 201 Created if sign-up is successful", async () => {
      const validHttpRequest = {
        body: {
          name: "Store Name",
          address: "123 Main Street",
          city: "Cityville",
          country: "Countryland",
        },
      };

      signUpStoreUseCaseMock.execute.mockResolvedValue("store_id");

      const response = await signUpStoreRouter.route(validHttpRequest);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBe("store_id");
    });

    it("should return 500 Internal Server Error for other errors", async () => {
      const validHttpRequest = {
        body: {
          name: "Store Name",
          address: "123 Main Street",
          city: "Cityville",
          country: "Countryland",
        },
      };

      signUpStoreUseCaseMock.execute.mockRejectedValue(new Error("Some error"));

      const response = await signUpStoreRouter.route(validHttpRequest);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });
});
