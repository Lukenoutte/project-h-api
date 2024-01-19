import SignUpStoreUseCase from "domain/usecases/stores/signup-store-usecase";
import SignUpStoreRouter from "presentation/routers/stores/signup-store-router";
import SignUpStoreRepository from "infra/repositories/stores/signup-store-repository";
import SetUserStoreRepository from "infra/repositories/users/set-user-store-repository";
import SignUpStoreRouterComposer from "main/composers/stores/signup-store-router-composer";

jest.mock("domain/usecases/stores/signup-store-usecase");
jest.mock("presentation/routers/stores/signup-store-router");
jest.mock("infra/repositories/stores/signup-store-repository");

describe("SignUpStoreRouterComposer", () => {
  it("Should compose a create store router", () => {
    const signUpStoreUseCase = new SignUpStoreUseCase({
      signUpStoreRepository: new SignUpStoreRepository(),
      setUserStoreRepository: new SetUserStoreRepository()
    });
    const signUpStoreRouter = new SignUpStoreRouter({ signUpStoreUseCase });
    jest
      .spyOn(SignUpStoreRouterComposer, "compose")
      .mockImplementation(() => signUpStoreRouter);
    expect(SignUpStoreRouterComposer.compose()).toBe(signUpStoreRouter);
  });
});
