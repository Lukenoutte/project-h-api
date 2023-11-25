import SignUpStoreUseCase from "src/domain/usecases/stores/signup-store-usecase";
import SignUpStoreRouter from "src/presentation/routers/stores/signup-store-router";
import SignUpStoreRepository from "src/infra/repositories/stores/create-store-repository";
import SignUpStoreRouterComposer from "src/main/composers/stores/signup-store-router-composer";

jest.mock("src/domain/usecases/stores/signup-store-usecase");
jest.mock("src/presentation/routers/stores/signup-store-router");
jest.mock("src/infra/repositories/stores/create-store-repository");

describe("SignUpStoreRouterComposer", () => {
  it("Should compose a create store router", () => {
    const signUpStoreUseCase = new SignUpStoreUseCase({
      signUpStoreRepository: new SignUpStoreRepository(),
    });
    const signUpStoreRouter = new SignUpStoreRouter({ signUpStoreUseCase });
    jest
      .spyOn(SignUpStoreRouterComposer, "compose")
      .mockImplementation(() => signUpStoreRouter);
    expect(SignUpStoreRouterComposer.compose()).toBe(signUpStoreRouter);
  });
});
