import CreateStoreUseCase from "src/domain/usecases/stores/create-store-usecase";
import CreateStoreRouter from "src/presentation/routers/stores/create-store-router";
import CreateStoreRepository from "src/infra/repositories/stores/create-store-repository";
import CreateStoreRouterComposer from "src/main/composers/stores/create-store-router-composer";

jest.mock("src/domain/usecases/stores/create-store-usecase");
jest.mock("src/presentation/routers/stores/create-store-router");
jest.mock("src/infra/repositories/stores/create-store-repository");

describe("CreateStoreRouterComposer", () => {
  it("Should compose a create store router", () => {
    const createStoreUseCase = new CreateStoreUseCase({
      createStoreRepository: new CreateStoreRepository(),
    });
    const createStoreRouter = new CreateStoreRouter({ createStoreUseCase });
    jest
      .spyOn(CreateStoreRouterComposer, "compose")
      .mockImplementation(() => createStoreRouter);
    expect(CreateStoreRouterComposer.compose()).toBe(createStoreRouter);
  });
});
