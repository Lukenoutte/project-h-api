import FindUserRouter from 'presentation/routers/users/find-user-router';
import { IFindUserUseCase } from 'domain/usecases/@interfaces/users-usecases.interfaces';
import HttpResponse from 'presentation/helpers/http-response';
import { IUserResponse } from 'domain/entities/@interfaces/user-entity.interfaces';

describe('FindUserRouter', () => {
  let findUserUseCase: IFindUserUseCase;
  let findUserRouter: FindUserRouter;

  beforeEach(() => {
    findUserUseCase = {
      findUserByIdRepository: { execute: jest.fn() },
      execute: jest.fn(async (params: { userId: number }): Promise<IUserResponse> => {
        return {
          name: 'John Doe',
          email: 'john.doe@example.com',
        };
      })
    };
    findUserRouter = new FindUserRouter({ findUserUseCase });
  });

  describe('validate', () => {
    it('should return valid response when params are valid', async () => {
      const params = { userId: 'valid-user-id' };
      const { isValid, error } = await findUserRouter.validate(params);
      expect(isValid).toBe(true);
      expect(error).toEqual({});
    });

    it('should return invalid response when params are invalid', async () => {
      const params = { userId: '' };
      const { isValid, error } = await findUserRouter.validate(params);
      expect(isValid).toBe(false);
      expect(error).toEqual({
        name: 'ValidationError',
        message: 'userId is a required field',
      });
    });
  });

  describe('route', () => {
    it('should return ok response when request is valid', async () => {
      const httpRequest = { body: { userId: 'valid-user-id' } };
      jest.spyOn(findUserRouter, 'validate').mockResolvedValueOnce({ isValid: true, error: {} });
      jest.spyOn(findUserUseCase, 'execute').mockResolvedValueOnce({ name: 'John Doe', email: 'john.doe@example.com' });
      const response = await findUserRouter.route(httpRequest as any);
      expect(response).toEqual(HttpResponse.ok({ name: 'John Doe', email: 'john.doe@example.com' }));
    });

    it('should return bad request response when request is invalid', async () => {
      const httpRequest = { body: { userId: '' } };
      jest.spyOn(findUserRouter, 'validate').mockResolvedValueOnce({ isValid: false, error: { name: 'ValidationError', message: 'userId is a required field' } });
      const response = await findUserRouter.route(httpRequest as any);
      expect(response).toEqual(HttpResponse.badRequest({ name: 'ValidationError', message: 'userId is a required field' }));
    });

    it('should return server error response when something goes wrong', async () => {
      const httpRequest = { body: { userId: 'invalid-user-id' } };
      jest.spyOn(findUserRouter, 'validate').mockRejectedValueOnce(new Error('Something went wrong!'));
      const response = await findUserRouter.route(httpRequest as any);
      expect(response).toEqual(HttpResponse.serverError('Something went wrong!'));
    });
  });
});