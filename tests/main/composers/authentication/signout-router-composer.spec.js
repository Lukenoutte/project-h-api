import SignOutUseCase from "src/domain/usecases/authentication/signout-usecase";
import SignOutRouter from "src/presentation/routers/authentication/signout-router";
import DeleteRefreshTokenRepository from "src/infra/repositories/authentication/delete-refresh-token-repository";
import SignOutRouterComposer from "src/main/composers/authentication/signout-router-composer";

jest.mock("src/domain/usecases/authentication/signout-usecase");
jest.mock("src/presentation/routers/authentication/signout-router");
jest.mock(
  "src/infra/repositories/authentication/delete-refresh-token-repository",
);

describe("SignOutRouterComposer", () => {
  it("Should compose a signout router", () => {
    const deleteRefreshTokenRepository = new DeleteRefreshTokenRepository();
    const signoutUseCase = new SignOutUseCase({
      deleteRefreshTokenRepository,
    });
    const signoutRouter = new SignOutRouter({ signoutUseCase });
    jest
      .spyOn(SignOutRouterComposer, "compose")
      .mockImplementation(() => signoutRouter);
    expect(SignOutRouterComposer.compose()).toBe(signoutRouter);
  });
});
