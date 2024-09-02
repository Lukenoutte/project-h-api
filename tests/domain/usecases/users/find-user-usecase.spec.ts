import { jest } from '@jest/globals';
import { IFindUserByIdRepository } from 'infra/repositories/@interfaces/users-respository.interfaces';
import { IUserResponse } from 'domain/entities/@interfaces/user-entity.interfaces';
import FindUserUseCase from 'domain/usecases/users/find-user-usecase';
import { IKeyCaseHelper } from 'infra/helpers/@interfaces/helper.interfaces';

describe('FindUserUseCase', () => {
  let findUserByIdRepository: IFindUserByIdRepository;
  let findUserUseCase: FindUserUseCase;
  let keyCaseHelper: IKeyCaseHelper;

  beforeEach(() => {
    findUserByIdRepository = {
      execute: jest.fn(async (params: { userId: number }): Promise<IUserResponse> => {
        return {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        };
      }),
    };
    keyCaseHelper = {
      snakeCaseToCamelCase: jest.fn((data: object | any[]) => data)
    }
    findUserUseCase = new FindUserUseCase({ 
      findUserByIdRepository,
      keyCaseHelper
     });
  });

  describe('execute', () => {
    it('should return user response without password', async () => {
      const params = { userId: 1 };
      const userFromRepository: IUserResponse = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashed-password',
      };
      jest.spyOn(findUserByIdRepository, 'execute').mockResolvedValueOnce(userFromRepository);

      const userResponse = await findUserUseCase.execute(params);

      expect(findUserByIdRepository.execute).toHaveBeenCalledWith(params);
      expect(userResponse).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    });

    it('should throw an error when something goes wrong', async () => {
      const params = { userId: 1 };
      jest.spyOn(findUserByIdRepository, 'execute').mockRejectedValueOnce(new Error('Something went wrong!'));

      await expect(findUserUseCase.execute(params)).rejects.toThrow('Something went wrong!');
      expect(findUserByIdRepository.execute).toHaveBeenCalledWith(params);
    });
  });
});