import LogoutUseCase from "src/domain/usecases/authentication/logout-usecase";
import LogoutRouter from "src/presentation/routers/authentication/logout-router";
import DeleteRefreshTokenRepository from "src/infra/repositories/authentication/delete-refresh-token-repository";
import LogoutRouterComposer from "src/main/composers/authentication/logout-router-composer";

jest.mock("src/domain/usecases/authentication/logout-usecase");
jest.mock("src/presentation/routers/authentication/logout-router");
jest.mock(
  "src/infra/repositories/authentication/delete-refresh-token-repository",
);

describe("LogoutRouterComposer", () => {
  it("Should compose a logout router", () => {
    const deleteRefreshTokenRepository = new DeleteRefreshTokenRepository();
    const logoutUseCase = new LogoutUseCase({
      deleteRefreshTokenRepository,
    });
    const logoutRouter = new LogoutRouter({ logoutUseCase });
    jest
      .spyOn(LogoutRouterComposer, "compose")
      .mockImplementation(() => logoutRouter);
    expect(LogoutRouterComposer.compose()).toBe(logoutRouter);
  });
});
