import SignInRouter from "src/presentation/routers/authentication/signin-router";
import HttpResponse from "src/presentation/helpers/http-response";

describe("SignInRouter", () => {
  const signInUseCaseMock = {
    execute: jest.fn(),
  };
  const sut = new SignInRouter({ signInUseCase: signInUseCaseMock });

  it("Should return ValidationError if password has less then 6 caracters", async () => {
    const body = {
      email: "test@gmail.com",
      password: "12345",
    };
    const {
      body: { error },
    } = await sut.route({ body });
    const { name, message } = error;
    expect(name).toEqual("ValidationError");
    expect(message).toEqual("password must be at least 6 characters");
  });

  it("Should return ValidationError if email is wrong", async () => {
    const body = {
      email: "testgmail.com",
      password: "123456",
    };
    const {
      body: { error },
    } = await sut.route({ body });
    const { name, message } = error;
    expect(name).toEqual("ValidationError");
    expect(message).toEqual("email must be a valid email");
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

  it("Should return ValidationError if httpRequest body is missing password", async () => {
    const httpRequest = { body: { email: "any_email@gmail.com" } };
    const {
      body: { error },
    } = await sut.route(httpRequest);
    const { name, message } = error;
    expect(name).toEqual("ValidationError");
    expect(message).toEqual("password is a required field");
  });

  it("Should return UnauthorizedError if signInUseCase execute throws an error", async () => {
    const httpRequest = {
      body: { email: "any_email@gmail.com", password: "any_password" },
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
      body: { email: "any_email@gmail.com", password: "any_password" },
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
      body: { email: "any_email@gmail.com", password: "any_password" },
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
