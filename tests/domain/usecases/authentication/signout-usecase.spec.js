import SignOutUseCase from "src/domain/usecases/authentication/signout-usecase";

describe("SignOutUseCase", () => {
  const deleteRefreshTokenRepositoryMock = {
    execute: jest.fn(),
  };
  const sut = new SignOutUseCase({
    deleteRefreshTokenRepository: deleteRefreshTokenRepositoryMock,
  });

  test("Should call deleteRefreshTokenRepository with correct userId", async () => {
    const userId = "any_id";
    await sut.execute({ userId });
    expect(deleteRefreshTokenRepositoryMock.execute).toHaveBeenCalledWith({
      userId,
    });
  });

  test("Should not return anything", async () => {
    const userId = "any_id";
    const result = await sut.execute({ userId });
    expect(result).toBeUndefined();
  });
});
