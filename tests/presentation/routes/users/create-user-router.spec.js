import CreateUserUseCase from "src/domain/usecases/users/create-user-usecase";
import logger from "src/main/configs/logger";
import HttpResponse from "src/presentation/helpers/http-response";
import { MissingParamError } from "src/presentation/errors";
import CreateUserRouter from "src/presentation/routers/users/create-user-router";

jest.mock("src/main/configs/logger");
jest.mock("src/presentation/helpers/http-response");
jest.mock("src/presentation/errors");
jest.mock("src/domain/usecases/users/create-user-usecase");

describe("CreateUserRouter", () => {
  it("Should execute the create user use case and return a created response", async () => {
    const createUserUseCase = new CreateUserUseCase();
    const createUserRouter = new CreateUserRouter({ createUserUseCase });
    const httpRequest = {
      body: { name: "Test", email: "test@test.com", password: "test" },
    };
    createUserUseCase.execute = jest.fn().mockResolvedValue("testUser");
    const response = await createUserRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.created("testUser"));
  });

  it("Should log an error and return a server error response when an error occurs", async () => {
    const createUserUseCase = new CreateUserUseCase();
    const createUserRouter = new CreateUserRouter({ createUserUseCase });
    const httpRequest = {
      body: { name: "Test", email: "test@test.com", password: "test" },
    };
    const error = new Error("Test error");
    createUserUseCase.execute = jest.fn().mockRejectedValue(error);
    const response = await createUserRouter.route(httpRequest);
    expect(logger.error).toHaveBeenCalledWith("CreateUserError", error);
    expect(response).toEqual(HttpResponse.serverError(error));
  });

  it("Should return a bad request response when a required field is missing", async () => {
    const createUserUseCase = new CreateUserUseCase();
    const createUserRouter = new CreateUserRouter({ createUserUseCase });
    const httpRequest = { body: { name: "Test", email: "test@test.com" } };
    const error = new MissingParamError("password");
    const response = await createUserRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.badRequest(error));
  });
});
