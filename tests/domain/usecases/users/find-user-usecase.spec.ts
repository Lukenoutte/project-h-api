import { jest } from '@jest/globals';
import { IFindUserByIdRepository } from 'infra/repositories/@interfaces/users-respository.interfaces';
import { IUserResponse } from 'domain/entities/@interfaces/user-entity.interfaces';
import FindUserUseCase from 'domain/usecases/users/find-user-usecase';

describe('FindUserUseCase', () => {
  let findUserByIdRepository: IFindUserByIdRepository;
  let findUserUseCase: FindUserUseCase;

  beforeEach(() => {
    findUserByIdRepository = {
      execute: jest.fn(async (params: { userId: string }): Promise<IUserResponse> => {
        return {
          name: 'John Doe',
          email: 'john.doe@example.com',
        };
      }),
    };
    findUserUseCase = new FindUserUseCase({ findUserByIdRepository });
  });

  describe('execute', () => {
    it('should return user response without password', async () => {
      const params = { userId: 'valid-user-id' };
      const userFromRepository: IUserResponse = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashed-password',
      };
      jest.spyOn(findUserByIdRepository, 'execute').mockResolvedValueOnce(userFromRepository);

      const userResponse = await findUserUseCase.execute(params);

      expect(findUserByIdRepository.execute).toHaveBeenCalledWith(params);
      expect(userResponse).toEqual({
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    });

    it('should throw an error when something goes wrong', async () => {
      const params = { userId: 'invalid-user-id' };
      jest.spyOn(findUserByIdRepository, 'execute').mockRejectedValueOnce(new Error('Something went wrong!'));

      await expect(findUserUseCase.execute(params)).rejects.toThrow('Something went wrong!');
      expect(findUserByIdRepository.execute).toHaveBeenCalledWith(params);
    });
  });
});