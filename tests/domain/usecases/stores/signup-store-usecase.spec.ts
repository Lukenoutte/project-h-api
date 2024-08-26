import { IStoreEntity } from "domain/entities/@interfaces/store-entity.interfaces";
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
});
