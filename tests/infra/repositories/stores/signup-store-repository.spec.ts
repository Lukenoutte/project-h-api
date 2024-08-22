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
      name: 'test',
      category: 'TI',
      subdomain: 'mystore',
      masterId: '1',
      getArray: jest
        .fn()
        .mockReturnValue([
          'name',
          'category',
          'subdomain',
          'masterId'
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
        (name, category, subdomain, master_id)
      VALUES
        ($1, $2, $3, $4);
      `,
      mockStoreEntity.getArray()
    );
  });
});
