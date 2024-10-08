import FindStoreUseCase from "domain/usecases/stores/find-store-usecase";
import FindStoreRouter from "presentation/routers/stores/find-store-router";
import FindStoreByMasterIdRespository from "infra/repositories/stores/find-store-by-master-id-repository";
import FindStoreRouterComposer from "main/composers/stores/find-store-router-composer";
import { IKeyCaseHelper } from "infra/helpers/@interfaces/helper.interfaces";

jest.mock("domain/usecases/stores/find-store-usecase");
jest.mock("presentation/routers/stores/find-store-router");
jest.mock("infra/repositories/stores/find-store-by-master-id-repository");

describe("FindStoreRouterComposer", () => {
  let keyCaseHelper: IKeyCaseHelper;
  keyCaseHelper = {
    snakeCaseToCamelCase: jest.fn((data: object | any[]) => data)
  }
  it("should compose a find store router", () => {
    const findStoreUseCase = new FindStoreUseCase({
        findStoreByMasterIdRespository: new FindStoreByMasterIdRespository(),
        keyCaseHelper
    });
    const findStoreRouter = new FindStoreRouter({ findStoreUseCase });
    jest
      .spyOn(FindStoreRouterComposer, "compose")
      .mockImplementation(() => findStoreRouter);
    expect(FindStoreRouterComposer.compose()).toBe(findStoreRouter);
  });
});
