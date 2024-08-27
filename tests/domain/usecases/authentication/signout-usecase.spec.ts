import SignOutUseCase from "domain/usecases/authentication/signout-usecase";

describe("SignOutUseCase", () => {
  const deleteRefreshTokenRepositoryMock = {
    execute: jest.fn(),
  };
  const sut = new SignOutUseCase({
    deleteRefreshTokenRepository: deleteRefreshTokenRepositoryMock,
  });

  test("should call deleteRefreshTokenRepository with correct userId", async () => {
    const userId = 0;
    await sut.execute({ userId });
    expect(deleteRefreshTokenRepositoryMock.execute).toHaveBeenCalledWith({
      userId,
    });
  });

  test("should not return anything", async () => {
    const userId = 0;
    const result = await sut.execute({ userId });
    expect(result).toBeUndefined();
  });
});
