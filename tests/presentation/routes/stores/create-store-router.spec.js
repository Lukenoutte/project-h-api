import CreateStoreUseCase from "src/domain/usecases/stores/create-store-usecase";
import logger from "src/main/configs/logger";
import HttpResponse from "src/presentation/helpers/http-response";
import { MissingParamError } from "src/presentation/errors";
import CreateStoreRouter from "src/presentation/routers/stores/create-store-router";

jest.mock("src/main/configs/logger");
jest.mock("src/presentation/helpers/http-response");
jest.mock("src/presentation/errors");
jest.mock("src/domain/usecases/stores/create-store-usecase");

describe("CreateStoreRouter", () => {
  it("Should execute the create store use case and return a created response", async () => {
    const createStoreUseCase = new CreateStoreUseCase();
    const createStoreRouter = new CreateStoreRouter({ createStoreUseCase });
    const httpRequest = {
      body: { name: "Test", address: "Test", city: "Test", country: "Test" },
    };
    createStoreUseCase.execute = jest.fn().mockResolvedValue("testStore");
    const response = await createStoreRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.created("testStore"));
  });

  it("Should log an error and return a server error response when an error occurs", async () => {
    const createStoreUseCase = new CreateStoreUseCase();
    const createStoreRouter = new CreateStoreRouter({ createStoreUseCase });
    const httpRequest = {
      body: { name: "Test", address: "Test", city: "Test", country: "Test" },
    };
    const error = new Error("Test error");
    createStoreUseCase.execute = jest.fn().mockRejectedValue(error);
    const response = await createStoreRouter.route(httpRequest);
    expect(logger.error).toHaveBeenCalledWith("CreateStoreError", error);
    expect(response).toEqual(HttpResponse.serverError(error));
  });

  it("Should return a bad request response when a required field is missing", async () => {
    const createStoreUseCase = new CreateStoreUseCase();
    const createStoreRouter = new CreateStoreRouter({ createStoreUseCase });
    const httpRequest = {
      body: { name: "Test", address: "Test", city: "Test" },
    };
    const error = new MissingParamError("country");
    const response = await createStoreRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.badRequest(error));
  });
});
