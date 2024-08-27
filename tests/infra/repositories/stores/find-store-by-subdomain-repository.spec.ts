import FindStoreBySubdomainRepository from 'infra/repositories/stores/find-store-by-subdomain-repository';
import PostgreHelper from 'infra/helpers/postgre-helper';
import { IStore } from 'domain/entities/@interfaces/store-entity.interfaces';

jest.mock('infra/helpers/postgre-helper');

describe('FindStoreByMasterIdRespository', () => {
  let findStoreBySubdomainRepository: FindStoreBySubdomainRepository;

  beforeEach(() => {
    findStoreBySubdomainRepository = new FindStoreBySubdomainRepository();
  });

  it('should return the store when found by subdomain', async () => {
    const subdomain = 'test';
    const mockStore: IStore = {
      name: 'Test Store',
      masterId: 1,
      subdomain,
      category: 'test'
    };

    (PostgreHelper.executeQuery as jest.Mock).mockResolvedValueOnce({
      rows: [mockStore],
    });

    const result = await findStoreBySubdomainRepository.execute({ subdomain });
    expect(result).toEqual(mockStore);
  });


  it('should throw an error if the database query fails', async () => {
    const subdomain = 'test';
    const errorMessage = 'Database error';

    (PostgreHelper.executeQuery as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(findStoreBySubdomainRepository.execute({ subdomain })).rejects.toThrow(errorMessage);
  });
});
