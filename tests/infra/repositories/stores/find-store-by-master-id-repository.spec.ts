import FindStoreByMasterIdRespository from 'infra/repositories/stores/find-store-by-master-id-repository';
import PostgreHelper from 'infra/helpers/postgre-helper';
import { IStore } from 'domain/entities/@interfaces/store-entity.interfaces';

jest.mock('infra/helpers/postgre-helper');

describe('FindStoreByMasterIdRespository', () => {
  let findStoreByMasterIdRepository: FindStoreByMasterIdRespository;

  beforeEach(() => {
    findStoreByMasterIdRepository = new FindStoreByMasterIdRespository();
  });

  it('should return the store when found by masterId', async () => {
    const masterId = 1;
    const mockStore: IStore = {
      name: 'Test Store',
      masterId,
      subdomain: 'test',
      category: 'test'
    };

    (PostgreHelper.executeQuery as jest.Mock).mockResolvedValueOnce({
      rows: [mockStore],
    });

    const result = await findStoreByMasterIdRepository.execute(masterId);
    expect(result).toEqual(mockStore);
  });


  it('should throw an error if the database query fails', async () => {
    const masterId = 1;
    const errorMessage = 'Database error';

    (PostgreHelper.executeQuery as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(findStoreByMasterIdRepository.execute(masterId)).rejects.toThrow(errorMessage);
  });
});
