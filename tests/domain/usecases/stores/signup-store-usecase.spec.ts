import StoreEntity from "domain/entities/store-entity";
import SignUpStoreUseCase from "domain/usecases/stores/signup-store-usecase";

describe("SignUpStoreUseCase", () => {
  const signUpStoreRepositoryMock = {
    execute: jest.fn(),
  };
  const sut = new SignUpStoreUseCase({
    signUpStoreRepository: signUpStoreRepositoryMock,
  });

  test("Should create a new store and return it", async () => {
    const params = {
      name: "Store Name",
      category: 'TI',
      subdomain: 'mystore',
      masterId: '1'
    };
    const storeEntity = new StoreEntity(params);
    const result = await sut.execute(params);
    expect(result).toEqual(storeEntity);
    expect(signUpStoreRepositoryMock.execute).toHaveBeenCalledWith(storeEntity);
  });
});
