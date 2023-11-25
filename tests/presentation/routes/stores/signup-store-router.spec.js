import SignUpStoreUseCase from "src/domain/usecases/stores/signup-store-usecase";
import logger from "src/main/configs/logger";
import HttpResponse from "src/presentation/helpers/http-response";
import { MissingParamError } from "src/presentation/errors";
import SignUpStoreRouter from "src/presentation/routers/stores/signup-store-router";

jest.mock("src/main/configs/logger");
jest.mock("src/presentation/helpers/http-response");
jest.mock("src/presentation/errors");
jest.mock("src/domain/usecases/stores/signup-store-usecase");

describe("SignUpStoreRouter", () => {
  it("Should execute the create store use case and return a created response", async () => {
    const signUpStoreUseCase = new SignUpStoreUseCase();
    const signUpStoreRouter = new SignUpStoreRouter({ signUpStoreUseCase });
    const httpRequest = {
      body: { name: "Test", address: "Test", city: "Test", country: "Test" },
    };
    signUpStoreUseCase.execute = jest.fn().mockResolvedValue("testStore");
    const response = await signUpStoreRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.created("testStore"));
  });

  it("Should log an error and return a server error response when an error occurs", async () => {
    const signUpStoreUseCase = new SignUpStoreUseCase();
    const signUpStoreRouter = new SignUpStoreRouter({ signUpStoreUseCase });
    const httpRequest = {
      body: { name: "Test", address: "Test", city: "Test", country: "Test" },
    };
    const error = new Error("Test error");
    signUpStoreUseCase.execute = jest.fn().mockRejectedValue(error);
    const response = await signUpStoreRouter.route(httpRequest);
    expect(logger.error).toHaveBeenCalledWith("SignUpStoreError", error);
    expect(response).toEqual(HttpResponse.serverError(error));
  });

  it("Should return a bad request response when a required field is missing", async () => {
    const signUpStoreUseCase = new SignUpStoreUseCase();
    const signUpStoreRouter = new SignUpStoreRouter({ signUpStoreUseCase });
    const httpRequest = {
      body: { name: "Test", address: "Test", city: "Test" },
    };
    const error = new MissingParamError("country");
    const response = await signUpStoreRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.badRequest(error));
  });
});
