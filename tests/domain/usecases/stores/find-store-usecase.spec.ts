import FindStoreUseCase from 'domain/usecases/stores/find-store-usecase';
import { IFindStoreByMasterIdRespository } from 'infra/repositories/@interfaces/stores-repository.interfaces';

describe('FindStoreUseCase', () => {
  let findStoreUseCase: FindStoreUseCase;
  let findStoreByMasterIdRespository: jest.Mocked<IFindStoreByMasterIdRespository>;

  beforeEach(() => {
    findStoreByMasterIdRespository = {
      execute: jest.fn(),
    };
    findStoreUseCase = new FindStoreUseCase({
      findStoreByMasterIdRespository,
    });
  });

  it('should return the store when found by masterId', async () => {
    const masterId = 1;
    const mockStore = {
      id: 1,
      name: 'Test Store',
      subdomain: 'test',
      category: 'test',
      masterId
    };

    findStoreByMasterIdRespository.execute.mockResolvedValue(mockStore);

    const result = await findStoreUseCase.execute({ masterId });

    expect(findStoreByMasterIdRespository.execute).toHaveBeenCalledWith(masterId);
    expect(result).toEqual(mockStore);
  });

  it('should throw an error if repository throws an error', async () => {
    const masterId = 1;
    const errorMessage = 'Repository error';

    findStoreByMasterIdRespository.execute.mockRejectedValue(new Error(errorMessage));

    await expect(findStoreUseCase.execute({ masterId })).rejects.toThrow(errorMessage);
  });
});
