import StoreEntity from "src/domain/entities/store-entity";
import CreateStoreUseCase from "src/domain/usecases/stores/create-store-usecase";

describe("CreateStoreUseCase", () => {
  const createStoreRepositoryMock = {
    execute: jest.fn(),
  };
  const sut = new CreateStoreUseCase({
    createStoreRepository: createStoreRepositoryMock,
  });

  test("Should create a new store and return it", async () => {
    const params = {
      name: "Store Name",
      address: "Store Address",
      city: "Store City",
      country: "Store Country",
    };
    const storeEntity = new StoreEntity(params);
    const result = await sut.execute(params);
    expect(result).toEqual(storeEntity);
    expect(createStoreRepositoryMock.execute).toHaveBeenCalledWith(storeEntity);
  });
});
