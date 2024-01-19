import SignUpUserUseCase from "domain/usecases/users/signup-user-usecase";

describe("SignUpUserUseCase", () => {
  const mockBcryptHelper = {
    hashPassword: jest.fn(async (password) => `hashed_${password}`),
    comparePassword: jest.fn(async (plainPassword, hashedPassword) => true)
  };

  const signUpUserRepositoryMock = {
    execute: jest.fn().mockResolvedValue(null),
  };

  const AlreadyExistsErrorMock = jest.fn().mockImplementation(() => {
    const error = new Error("AlreadyExists");
    error.name = "AlreadyExistsError";
    return error;
  });

  const fakeUser = () => ({
    level: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  });

  it("Should throw an error if user already exists", async () => {
    const findUserRepositoryMock = {
      execute: jest.fn().mockResolvedValue({}),
    };
    const signUpUserUseCase = new SignUpUserUseCase({
      findUserRepository: findUserRepositoryMock,
      signUpUserRepository: signUpUserRepositoryMock,
      bcryptHelper: mockBcryptHelper,
      alreadyExistsError: AlreadyExistsErrorMock(),
    });
    await expect(signUpUserUseCase.execute(fakeUser())).rejects.toThrowError(
      AlreadyExistsErrorMock(),
    );
  });

  it("Should create a new user", async () => {
    const findUserRepositoryMock = {
      execute: jest.fn().mockResolvedValue(null),
    };

    const signUpUserUseCase = new SignUpUserUseCase({
      findUserRepository: findUserRepositoryMock,
      signUpUserRepository: signUpUserRepositoryMock,
      bcryptHelper: mockBcryptHelper,
      alreadyExistsError: AlreadyExistsErrorMock(),
    });

    await signUpUserUseCase.execute(fakeUser());

    expect(findUserRepositoryMock.execute).toHaveBeenCalled();
    expect(signUpUserRepositoryMock.execute).toHaveBeenCalled();
  });
});
