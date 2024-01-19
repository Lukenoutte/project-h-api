import { IStoreEntity } from 'domain/entities/@interfaces/store-entity.interfaces';
import PostgreHelper from 'infra/helpers/postgre-helper';
import { ISignUpStoreRepository } from 'infra/repositories/@interfaces/stores-repository.interfaces';
import SignUpStoreRepository from 'infra/repositories/stores/signup-store-repository';

jest.mock('infra/helpers/postgre-helper');

describe('SignUpStoreRepository', () => {
  let signUpStoreRepository: ISignUpStoreRepository;
  let mockStoreEntity: IStoreEntity;

  beforeEach(() => {
    signUpStoreRepository = new SignUpStoreRepository();
    mockStoreEntity = {
      userId: 1,
      name: 'test',
      category: 'TI',
      subdomain: 'mystore',
      getArray: jest
        .fn()
        .mockReturnValue([
          'name',
          'category',
          'subdomain',
        ]),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should execute a query to insert a new store', async () => {
    await signUpStoreRepository.execute(mockStoreEntity);

    expect(PostgreHelper.executeQuery).toHaveBeenCalledWith(
      `
      INSERT INTO stores
        (name, category, subdomain)
      VALUES
        ($1, $2, $3)
      RETURNING id;
      `,
      mockStoreEntity.getArray()
    );
  });
});
