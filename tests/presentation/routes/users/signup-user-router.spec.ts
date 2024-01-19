import { ISignUpUserUseCase } from 'domain/usecases/@interfaces/users-usecases.interfaces';
import SignUpUserUseCase from 'domain/usecases/users/signup-user-usecase';
import {
  IRequest,
  IRouter,
} from 'presentation/routers/@interfaces/router.interfaces';
import SignUpUserRouter from 'presentation/routers/users/signup-master-router';

describe('SignUpUserRouter', () => {
  let signUpUserRouter: IRouter;
  let signUpUserUseCaseMock: ISignUpUserUseCase;

  const findUserRepositoryMock = {
    execute: jest.fn().mockResolvedValue({}),
  };

  const signUpUserRepositoryMock = {
    execute: jest.fn().mockResolvedValue(null),
  };

  const mockBcryptHelper = {
    hashPassword: jest.fn(async (password) => `hashed_${password}`),
    comparePassword: jest.fn(async (plainPassword, hashedPassword) => true),
  };

  const AlreadyExistsErrorMock = jest.fn().mockImplementation(() => {
    const error = new Error('AlreadyExists');
    error.name = 'AlreadyExistsError';
    return error;
  });

  const mockRequest = (body: object): Partial<IRequest> => {
    const req: Partial<IRequest> = {
      body,
      params: {},
      query: {},
    };
    return req;
  };

  beforeEach(() => {
    signUpUserUseCaseMock = new SignUpUserUseCase({
      findUserRepository: findUserRepositoryMock,
      signUpUserRepository: signUpUserRepositoryMock,
      bcryptHelper: mockBcryptHelper,
      alreadyExistsError: AlreadyExistsErrorMock(),
    });

    signUpUserRouter = new SignUpUserRouter({
      signUpUserUseCase: signUpUserUseCaseMock,
    });
  });

  describe('validate', () => {
    it('should return isValid true if validation passes', async () => {
      const body = {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: 'password123',
      };
      if (signUpUserRouter.validate) {
        const result = await signUpUserRouter.validate(body);
        expect(result.isValid).toBe(true);
      } else fail('validate function is not defined on signUpUserRouter');
    });

    it('should return isValid false and error details if validation fails', async () => {
      const body = {
        name: 'John Doe',
        email: 'invalid_email',
        password: 'short',
      };
      if (signUpUserRouter.validate) {
        const result = await signUpUserRouter.validate(body);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      } else fail('validate function is not defined on signUpUserRouter');
    });
  });

  describe('#route', () => {
    it('should return 400 Bad Request if validation fails', async () => {
      const body = {
        name: 'John Doe',
        email: 'invalid_email',
        password: 'short',
      };
      const req = mockRequest(body) as IRequest;
      const response = await signUpUserRouter.route(req);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
