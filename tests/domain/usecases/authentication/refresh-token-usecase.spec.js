import { UnauthorizedError } from "src/presentation/errors";
import RefreshTokenUseCase from "src/domain/usecases/authentication/refresh-token-usecase";

describe("RefreshTokenUseCase", () => {
  const findRefreshTokenRepositoryMock = {
    execute: jest.fn(),
  };
  const jwtHelperRefreshTokenMock = {
    verifyToken: jest.fn(),
  };
  const jwtHelperAccessTokenMock = {
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
    const params = { refreshToken: "any_refresh_token", userId: "any_id" };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(unauthorizedErrorMock);
  });

  test("Should throw UnauthorizedError if refreshToken isnt valid", async () => {
    findRefreshTokenRepositoryMock.execute.mockResolvedValueOnce(
      "any_refresh_token",
    );
    jwtHelperRefreshTokenMock.verifyToken.mockReturnValueOnce(false);
    const params = { refreshToken: "any_refresh_token", userId: "any_id" };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(unauthorizedErrorMock);
  });

  test("Should return new accessToken if refreshToken exists and is valid", async () => {
    const refreshToken = "any_refresh_token";
    const userId = "any_id";
    findRefreshTokenRepositoryMock.execute.mockResolvedValueOnce(refreshToken);
    jwtHelperRefreshTokenMock.verifyToken.mockReturnValueOnce(true);
    jwtHelperAccessTokenMock.generateToken.mockReturnValueOnce(
      "any_access_token",
    );
    const params = { refreshToken, userId };
    const result = await sut.execute(params);
    expect(result).toBe("any_access_token");
  });
});
