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
      address: 'test',
      city: 'test',
      country: 'test',
      phone: '123',
      category: 'TI',
      subdomain: 'mystore',
      getArray: jest
        .fn()
        .mockReturnValue([
          'name',
          'address',
          'city',
          'country',
          'phone',
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
        (name, address, city, country, phone, category, subdomain)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7);
      `,
      mockStoreEntity.getArray()
    );
  });
});
