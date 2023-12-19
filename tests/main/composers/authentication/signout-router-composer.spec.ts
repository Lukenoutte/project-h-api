import SignOutUseCase from "domain/usecases/authentication/signout-usecase";
import SignOutRouter from "presentation/routers/authentication/signout-router";
import DeleteRefreshTokenRepository from "infra/repositories/authentication/delete-refresh-token-repository";
import SignOutRouterComposer from "main/composers/authentication/signout-router-composer";

jest.mock("domain/usecases/authentication/signout-usecase");
jest.mock("presentation/routers/authentication/signout-router");
jest.mock(
  "infra/repositories/authentication/delete-refresh-token-repository",
);

describe("SignOutRouterComposer", () => {
  it("Should compose a signOut router", () => {
    const deleteRefreshTokenRepository = new DeleteRefreshTokenRepository();
    const signOutUseCase = new SignOutUseCase({
      deleteRefreshTokenRepository,
    });
    const signOutRouter = new SignOutRouter({ signOutUseCase });
    jest
      .spyOn(SignOutRouterComposer, "compose")
      .mockImplementation(() => signOutRouter);
    expect(SignOutRouterComposer.compose()).toBe(signOutRouter);
  });
});
