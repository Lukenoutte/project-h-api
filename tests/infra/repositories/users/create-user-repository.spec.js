import PostgreHelper from "../../../../src/infra/helpers/postgre-helper";
import CreateUserRepository from "../../../../src/infra/repositories/users/create-user-repository";

jest.mock("../../../../src/infra/helpers/postgre-helper");

describe("CreateUserRepository", () => {
  let createUserRepository;

  beforeEach(() => {
    createUserRepository = new CreateUserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should execute a query to insert a user", async () => {
    const userEntity = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      address: "123 Test St",
      city: "Test City",
      country: "Test Country",
      getArray: jest
        .fn()
        .mockReturnValue([
          "Test User",
          "test@example.com",
          "password123",
          "123 Test St",
          "Test City",
          "Test Country",
        ]),
    };

    await createUserRepository.execute(userEntity);

    expect(PostgreHelper.executeQuery).toHaveBeenCalledWith(
      `
      INSERT INTO users
        (name, email, password, address, city, country)
      VALUES
        ($1, $2, $3, $4, $5, $6);
      `,
      userEntity.getArray(),
    );
  });

  it("should throw an error if executeQuery fails", async () => {
    const userEntity = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      address: "123 Test St",
      city: "Test City",
      country: "Test Country",
      getArray: jest
        .fn()
        .mockReturnValue([
          "Test User",
          "test@example.com",
          "password123",
          "123 Test St",
          "Test City",
          "Test Country",
        ]),
    };

    PostgreHelper.executeQuery.mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    try {
      await createUserRepository.execute(userEntity);
    } catch (error) {
      expect(error).toEqual(new Error("Database error"));
    }
  });
});
