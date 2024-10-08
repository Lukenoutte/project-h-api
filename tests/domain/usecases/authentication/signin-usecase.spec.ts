import { WrongCredentialsError } from "presentation/errors";
import SignInUseCase from "domain/usecases/authentication/signin-usecase";

describe("SignInUseCase", () => {
  const findUserRepositoryMock = {
    execute: jest.fn(),
  };
  const bcryptHelperMock = {
    hashPassword: jest.fn(async (password) => `hashed_${password}`),
    comparePassword: jest.fn(async (plainPassword, hashedPassword) => true)
  };
  const wrongCredentialsErrorMock = new WrongCredentialsError();
  const jwtHelperAccessTokenMock = {
    verifyToken: jest.fn(),
    generateToken: jest.fn(),
  };
  const jwtHelperRefreshTokenMock = {
    verifyToken: jest.fn(),
    generateToken: jest.fn(),
  };
  const createRefreshTokenRepositoryMock = {
    execute: jest.fn(),
  };
  const findRefreshTokenRepositoryMock = {
    execute: jest.fn(),
  };
  const updateRefreshTokenRepositoryMock = {
    execute: jest.fn(),
  };
  const sut = new SignInUseCase({
    findUserByEmailRepository: findUserRepositoryMock,
    bcryptHelper: bcryptHelperMock,
    wrongCredentialsError: wrongCredentialsErrorMock,
    jwtHelperAccessToken: jwtHelperAccessTokenMock,
    jwtHelperRefreshToken: jwtHelperRefreshTokenMock,
    createRefreshTokenRepository: createRefreshTokenRepositoryMock,
    findRefreshTokenRepository: findRefreshTokenRepositoryMock,
    updateRefreshTokenRepository: updateRefreshTokenRepositoryMock,
  });

  test("should throw WrongCredentialsError if user is not found", async () => {
    findUserRepositoryMock.execute.mockResolvedValueOnce(null);
    const params = { email: "any_email", password: "any_password" };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(wrongCredentialsErrorMock);
  });

  test("should throw WrongCredentialsError if password is incorrect", async () => {
    findUserRepositoryMock.execute.mockResolvedValueOnce({
      password: "hashed_password",
    });
    bcryptHelperMock.comparePassword.mockResolvedValueOnce(false);
    const params = { email: "any_email", password: "any_password" };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(wrongCredentialsErrorMock);
  });

  test("should return tokens if user is found and password is correct", async () => {
    const user = { id: "any_id", password: "hashed_password" };
    findUserRepositoryMock.execute.mockResolvedValueOnce(user);
    bcryptHelperMock.comparePassword.mockResolvedValueOnce(true);
    jwtHelperAccessTokenMock.generateToken.mockReturnValueOnce(
      "any_access_token",
    );
    jwtHelperRefreshTokenMock.generateToken.mockReturnValueOnce(
      "any_refresh_token",
    );
    const params = { email: "any_email", password: "any_password" };
    const result = await sut.execute(params);
    expect(result).toEqual({
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
    });
  });
});
