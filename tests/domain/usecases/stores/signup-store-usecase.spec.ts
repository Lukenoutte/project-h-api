import StoreEntity from 'domain/entities/store-entity';
import SignUpStoreUseCase from 'domain/usecases/stores/signup-store-usecase';

describe('SignUpStoreUseCase', () => {
  const signUpStoreRepositoryMock = {
    execute: jest.fn(() => Promise.resolve(42)),
  };
  
  const setUserStoreRepositoryMock = {
    execute: jest.fn(),
  };

  const sut = new SignUpStoreUseCase({
    signUpStoreRepository: signUpStoreRepositoryMock,
    setUserStoreRepository: setUserStoreRepositoryMock
  });

  test('Should create a new store and return the id', async () => {
    const params = {
      userId: 1,
      name: 'Store Name',
      category: 'TI',
      subdomain: 'mystore',
    };
    const storeEntity = new StoreEntity(params);
    await sut.execute(params);
    expect(signUpStoreRepositoryMock.execute).toHaveBeenCalledWith(storeEntity);
  });
});
