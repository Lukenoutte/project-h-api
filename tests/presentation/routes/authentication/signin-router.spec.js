import SignInRouter from "src/presentation/routers/authentication/signin-router";
import { MissingParamError } from "src/presentation/errors";
import HttpResponse from "src/presentation/helpers/http-response";

describe("SignInRouter", () => {
  const signInUseCaseMock = {
    execute: jest.fn(),
  };
  const sut = new SignInRouter({ signInUseCase: signInUseCaseMock });

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

  it("Should return UnauthorizedError if signInUseCase execute throws an error", async () => {
    const httpRequest = {
      body: { email: "any_email", password: "any_password" },
    };
    signInUseCaseMock.execute.mockImplementationOnce(() => {
      throw new Error("any_error");
    });
    const response = await sut.route(httpRequest);
    expect(response).toEqual(
      HttpResponse.unauthorizedError(new Error("any_error")),
    );
  });

  it("Should return UnauthorizedError if signInUseCase execute throws WrongCredentialsError", async () => {
    const httpRequest = {
      body: { email: "any_email", password: "any_password" },
    };
    signInUseCaseMock.execute.mockImplementationOnce(() => {
      throw new Error("WrongCredentialsError");
    });
    const response = await sut.route(httpRequest);
    expect(response).toEqual(
      HttpResponse.unauthorizedError(new Error("WrongCredentialsError")),
    );
  });

  it("Should return Ok if signInUseCase execute returns tokens", async () => {
    const httpRequest = {
      body: { email: "any_email", password: "any_password" },
    };
    const tokens = {
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
    };
    signInUseCaseMock.execute.mockImplementationOnce(() => tokens);
    const response = await sut.route(httpRequest);
    expect(response).toEqual(HttpResponse.ok(tokens));
  });
});
