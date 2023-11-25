import SignUpUserUseCase from "src/domain/usecases/users/signup-user-usecase";
import logger from "src/main/configs/logger";
import HttpResponse from "src/presentation/helpers/http-response";
import { MissingParamError } from "src/presentation/errors";
import SignUpUserRouter from "src/presentation/routers/users/signup-user-router";

jest.mock("src/main/configs/logger");
jest.mock("src/presentation/helpers/http-response");
jest.mock("src/presentation/errors");
jest.mock("src/domain/usecases/users/signup-user-usecase");

describe("SignUpUserRouter", () => {
  it("Should execute the create user use case and return a created response", async () => {
    const signUpUserUseCase = new SignUpUserUseCase();
    const signUpUserRouter = new SignUpUserRouter({ signUpUserUseCase });
    const httpRequest = {
      body: { name: "Test", email: "test@test.com", password: "test" },
    };
    signUpUserUseCase.execute = jest.fn().mockResolvedValue("testUser");
    const response = await signUpUserRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.created("testUser"));
  });

  it("Should log an error and return a server error response when an error occurs", async () => {
    const signUpUserUseCase = new SignUpUserUseCase();
    const signUpUserRouter = new SignUpUserRouter({ signUpUserUseCase });
    const httpRequest = {
      body: { name: "Test", email: "test@test.com", password: "test" },
    };
    const error = new Error("Test error");
    signUpUserUseCase.execute = jest.fn().mockRejectedValue(error);
    const response = await signUpUserRouter.route(httpRequest);
    expect(logger.error).toHaveBeenCalledWith("SignUpUserError", error);
    expect(response).toEqual(HttpResponse.serverError(error));
  });

  it("Should return a bad request response when a required field is missing", async () => {
    const signUpUserUseCase = new SignUpUserUseCase();
    const signUpUserRouter = new SignUpUserRouter({ signUpUserUseCase });
    const httpRequest = { body: { name: "Test", email: "test@test.com" } };
    const error = new MissingParamError("password");
    const response = await signUpUserRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.badRequest(error));
  });
});
