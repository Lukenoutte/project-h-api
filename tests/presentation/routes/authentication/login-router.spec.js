import LoginRouter from "../../../../src/presentation/routers/authentication/login-router";
import { MissingParamError } from "../../../../src/presentation/errors";
import HttpResponse from "../../../../src/presentation/helpers/http-response";

describe("LoginRouter", () => {
  const loginUseCaseMock = {
    execute: jest.fn(),
  };
  const sut = new LoginRouter({ loginUseCase: loginUseCaseMock });

  it("Should return MissingParamError if email is missing", async () => {
    const httpRequest = { password: "any_password" };
    const error = await sut.route(httpRequest);
    expect(error.statusCode).toEqual(401);
  });

  it("Should return BadRequest if httpRequest is not provided", async () => {
    const httpRequest = null;
    const response = await sut.route(httpRequest);
    expect(response).toEqual(
      HttpResponse.unauthorizedError(new Error("Invalid Request")),
    );
  });

  it("Should return BadRequest if httpRequest body is not provided", async () => {
    const httpRequest = {};
    const response = await sut.route(httpRequest);
    expect(response).toEqual(
      HttpResponse.unauthorizedError(new Error("Invalid Request")),
    );
  });

  it("Should return BadRequest if httpRequest body is missing required fields", async () => {
    const httpRequest = { body: { email: "any_email" } };
    const response = await sut.route(httpRequest);
    expect(response).toEqual(
      HttpResponse.badRequest(new MissingParamError("password")),
    );
  });

  it("Should return UnauthorizedError if loginUseCase execute throws an error", async () => {
    const httpRequest = {
      body: { email: "any_email", password: "any_password" },
    };
    loginUseCaseMock.execute.mockImplementationOnce(() => {
      throw new Error("any_error");
    });
    const response = await sut.route(httpRequest);
    expect(response).toEqual(
      HttpResponse.unauthorizedError(new Error("any_error")),
    );
  });

  it("Should return UnauthorizedError if loginUseCase execute throws WrongCredentialsError", async () => {
    const httpRequest = {
      body: { email: "any_email", password: "any_password" },
    };
    loginUseCaseMock.execute.mockImplementationOnce(() => {
      throw new Error("WrongCredentialsError");
    });
    const response = await sut.route(httpRequest);
    expect(response).toEqual(
      HttpResponse.unauthorizedError(new Error("WrongCredentialsError")),
    );
  });

  it("Should return Ok if loginUseCase execute returns tokens", async () => {
    const httpRequest = {
      body: { email: "any_email", password: "any_password" },
    };
    const tokens = {
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
    };
    loginUseCaseMock.execute.mockImplementationOnce(() => tokens);
    const response = await sut.route(httpRequest);
    expect(response).toEqual(HttpResponse.ok(tokens));
  });
});
