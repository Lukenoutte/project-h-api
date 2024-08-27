import StoreEntity from "domain/entities/store-entity";
import SignUpStoreUseCase from "domain/usecases/stores/signup-store-usecase";
import SetUserStoreRepository from "infra/repositories/users/set-user-store-repository";

describe("SignUpStoreUseCase", () => {
  const signUpStoreRepositoryMock = {
    execute: jest.fn().mockResolvedValue(1),
  };
  const sut = new SignUpStoreUseCase({
    signUpStoreRepository: signUpStoreRepositoryMock,
    setUserStoreRepository: new SetUserStoreRepository()
  });

  test("should create a new store and return it", async () => {
    const params = {
      name: "Store Name",
      category: 'TI',
      subdomain: 'mystore',
      masterId: 1
    };
    const storeEntity = new StoreEntity(params);
    const result = await sut.execute(params);
    expect(result).toEqual(storeEntity);
    expect(signUpStoreRepositoryMock.execute).toHaveBeenCalledWith(storeEntity);
  });
  test("should throw an error if store creation fails", async () => {
    signUpStoreRepositoryMock.execute.mockReturnValueOnce(undefined);
    const params = {
      name: "Store Name",
      category: 'TI',
      subdomain: 'mystore',
      masterId: 1
    };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow('SignUpStoreError');
  });
});
