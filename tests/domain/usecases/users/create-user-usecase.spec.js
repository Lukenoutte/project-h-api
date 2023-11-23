import CreateUserUseCase from "src/domain/usecases/users/create-user-usecase";

describe("CreateUserUseCase", () => {
  const mockBcryptHelper = {
    hashPassword: jest.fn(async (password) => `hashed_${password}`),
  };

  const createUserRepositoryMock = {
    execute: jest.fn().mockResolvedValue(null),
  };

  const AlreadyExistsErrorMock = jest.fn().mockImplementation(() => {
    const error = new Error("AlreadyExists");
    error.name = "AlreadyExistsError";
    return error;
  });

  const fakeUser = () => ({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    address: "123 Main St",
    city: "Cityville",
    country: "Countryland",
  });

  it("Should throw an error if user already exists", async () => {
    const findUserRepositoryMock = {
      execute: jest.fn().mockResolvedValue({}),
    };
    const createUserUseCase = new CreateUserUseCase({
      findUserRepository: findUserRepositoryMock,
      createUserRepository: createUserRepositoryMock,
      bcryptHelper: mockBcryptHelper,
      alreadyExistsError: AlreadyExistsErrorMock(),
    });
    await expect(createUserUseCase.execute(fakeUser())).rejects.toThrowError(
      AlreadyExistsErrorMock(),
    );
  });

  it("Should create a new user", async () => {
    const findUserRepositoryMock = {
      execute: jest.fn().mockResolvedValue(null),
    };

    const createUserUseCase = new CreateUserUseCase({
      findUserRepository: findUserRepositoryMock,
      createUserRepository: createUserRepositoryMock,
      bcryptHelper: mockBcryptHelper,
      alreadyExistsError: AlreadyExistsErrorMock(),
    });

    await createUserUseCase.execute(fakeUser());

    expect(findUserRepositoryMock.execute).toHaveBeenCalled();
    expect(createUserRepositoryMock.execute).toHaveBeenCalled();
  });
});
