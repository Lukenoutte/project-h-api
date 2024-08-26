import { UnauthorizedError } from "presentation/errors";
import RefreshTokenUseCase from "domain/usecases/authentication/refresh-token-usecase";
import { IJwtHelper } from "infra/helpers/@interfaces/helper.interfaces";

describe("RefreshTokenUseCase", () => {
  const findRefreshTokenRepositoryMock = {
    execute: jest.fn(),
  };
  const jwtHelperRefreshTokenMock: IJwtHelper = {
    verifyToken: jest.fn(),
    generateToken: jest.fn(),
  };
  const jwtHelperAccessTokenMock: IJwtHelper  = {
    verifyToken: jest.fn(),
    generateToken: jest.fn(),
  };
  const unauthorizedErrorMock = new UnauthorizedError();
  const sut = new RefreshTokenUseCase({
    findRefreshTokenRepository: findRefreshTokenRepositoryMock,
    jwtHelperRefreshToken: jwtHelperRefreshTokenMock,
    jwtHelperAccessToken: jwtHelperAccessTokenMock,
    unauthorizedError: unauthorizedErrorMock,
  });

  test("Should throw UnauthorizedError if refreshToken doesnt exist", async () => {
    findRefreshTokenRepositoryMock.execute.mockResolvedValueOnce(null);
    const params = { refreshToken: "any_refresh_token", userId: 1 };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(unauthorizedErrorMock);
  });

  test("Should throw UnauthorizedError if refreshToken isnt valid", async () => {
    findRefreshTokenRepositoryMock.execute.mockResolvedValueOnce(
      "any_refresh_token",
    );
    (jwtHelperRefreshTokenMock.verifyToken as jest.Mock).mockReturnValueOnce(false);
    const params = { refreshToken: "any_refresh_token", userId: 1 };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(unauthorizedErrorMock);
  });

  test("Should return new accessToken if refreshToken exists and is valid", async () => {
    const refreshToken = "any_refresh_token";
    const userId = 1;
    findRefreshTokenRepositoryMock.execute.mockResolvedValueOnce(refreshToken);
    (jwtHelperRefreshTokenMock.verifyToken as jest.Mock).mockReturnValueOnce(true);
    (jwtHelperAccessTokenMock.generateToken as jest.Mock).mockReturnValueOnce(
      "any_access_token",
    );
    const params = { refreshToken, userId };
    const result = await sut.execute(params);
    expect(result).toBe("any_access_token");
  });
});
