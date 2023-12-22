import SignInRouter from 'presentation/routers/authentication/signin-router';
import { WrongCredentialsError } from 'presentation/errors';
import { ISignInUseCase } from 'domain/usecases/@interfaces/authentication-usecases.interfaces';
import { IFindUserRepository } from 'infra/repositories/@interfaces/users-respository.interfaces';
import {
  IBcryptHelper,
  IJwtHelper,
} from 'infra/helpers/@interfaces/helper.interfaces';
import {
  ICreateRefreshTokenRepository,
  IFindRefreshTokenRepository,
  IUpdateRefreshTokenRepository,
} from 'infra/repositories/@interfaces/authentication-repository.interfaces';
import { IRequest } from 'presentation/routers/@interfaces/router.interfaces';

describe('SignInRouter', () => {
  let signInRouter: SignInRouter;
  let signInUseCaseMock: ISignInUseCase;
  const findUserRepositoryMock: IFindUserRepository = {
    execute: jest.fn(),
  };
  const bcryptHelperMock: IBcryptHelper = {
    hashPassword: jest.fn(async (password) => `hashed_${password}`),
    comparePassword: jest.fn(async (plainPassword, hashedPassword) => true),
  };
  const wrongCredentialsErrorMock: Error = new WrongCredentialsError();
  const jwtHelperAccessTokenMock: IJwtHelper = {
    verifyToken: jest.fn(),
    generateToken: jest.fn(),
  };
  const jwtHelperRefreshTokenMock: IJwtHelper = {
    verifyToken: jest.fn(),
    generateToken: jest.fn(),
  };
  const createRefreshTokenRepositoryMock: ICreateRefreshTokenRepository = {
    execute: jest.fn(),
  };
  const findRefreshTokenRepositoryMock: IFindRefreshTokenRepository = {
    execute: jest.fn(),
  };
  const updateRefreshTokenRepositoryMock: IUpdateRefreshTokenRepository = {
    execute: jest.fn(),
  };
  beforeEach(() => {
    signInUseCaseMock = {
      findUserRepository: findUserRepositoryMock,
      bcryptHelper: bcryptHelperMock,
      wrongCredentialsError: wrongCredentialsErrorMock,
      jwtHelperAccessToken: jwtHelperAccessTokenMock,
      jwtHelperRefreshToken: jwtHelperRefreshTokenMock,
      createRefreshTokenRepository: createRefreshTokenRepositoryMock,
      findRefreshTokenRepository: findRefreshTokenRepositoryMock,
      updateRefreshTokenRepository: updateRefreshTokenRepositoryMock,
      execute: jest.fn(),
      handleRefreshToken: jest.fn(),
    };
    signInRouter = new SignInRouter({ signInUseCase: signInUseCaseMock });
  });

  it('should return 200 for valid credentials', async () => {
    const mockRequest = {
      body: {
        email: 'validemail@example.com',
        password: 'validpassword',
      },
    } as IRequest;

    (signInUseCaseMock.execute as jest.Mock).mockResolvedValue('valid tokens');

    const response = await signInRouter.route(mockRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('valid tokens');
  });

  it('should return 400 for invalid credentials', async () => {
    const mockRequest = {
      body: {
        email: 'invalidemail',
        password: 'short',
      },
    } as IRequest;

    const response = await signInRouter.route(mockRequest);

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 for missing credentials', async () => {
    const mockRequest = {
      body: {},
    } as IRequest;

    const response = await signInRouter.route(mockRequest);

    expect(response.statusCode).toBe(400);
  });

  it('should handle unexpected errors', async () => {
    const mockRequest = {
      body: {
        email: 'validemail@example.com',
        password: 'validpassword',
      },
    } as IRequest;

    (signInUseCaseMock.execute as jest.Mock).mockRejectedValue(
      new Error('Unexpected error')
    );

    const response = await signInRouter.route(mockRequest);

    expect(response.statusCode).toBe(401);
  });
});
