import StoreEntity from "domain/entities/store-entity";
import SignUpStoreUseCase from "domain/usecases/stores/signup-store-usecase";
import { ISetUserStoreRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import SetUserStoreRepository from "infra/repositories/users/set-user-store-repository";

describe("SignUpStoreUseCase", () => {
  const signUpStoreRepository = {
    execute: jest.fn().mockResolvedValue(1),
  };
  let setUserStoreRepository = {
    execute: jest.fn(),
  };

  const sut = new SignUpStoreUseCase({
    signUpStoreRepository,
    setUserStoreRepository  
  });

  test("should create a new store", async () => {
    const params = {
      name: "Store Name",
      category: 'TI',
      subdomain: 'mystore',
      masterId: 1
    };
    const storeEntity = new StoreEntity(params);
    await sut.execute(params);
    expect(signUpStoreRepository.execute).toHaveBeenCalledWith(storeEntity);
    expect(setUserStoreRepository.execute).toHaveBeenCalled();
  });
  test("should throw an error if store creation fails", async () => {
    signUpStoreRepository.execute.mockReturnValueOnce(undefined);
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
