import { IUserEntity } from "domain/entities/@interfaces/user-entity.interfaces";
import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";
import PostgreHelper from "infra/helpers/postgre-helper";
import { ISignUpUserRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import SignUpUserRepository from "infra/repositories/users/signup-user-repository";

jest.mock("infra/helpers/postgre-helper");

const mockBcryptHelper: IBcryptHelper = {
  hashPassword: jest.fn(async (password) => `hashed_${password}`),
  comparePassword: jest.fn(async (plainPassword, hashedPassword) => true)
};

describe("SignUpUserRepository", () => {
  let signUpUserRepository: ISignUpUserRepository;

  beforeEach(() => {
    signUpUserRepository = new SignUpUserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should execute a query to insert a user", async () => {
    const userEntity: IUserEntity = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      bcryptHelper: mockBcryptHelper,
      getArray: jest
        .fn()
        .mockReturnValue([
          "Test User",
          "test@example.com",
          "password123",
        ]),
      encryptPassword: function (): void {
        throw new Error("Function not implemented.");
      }
    };

    await signUpUserRepository.execute(userEntity);

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
    const userEntity: IUserEntity = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      bcryptHelper: mockBcryptHelper,
      getArray: jest
        .fn()
        .mockReturnValue([
          "Test User",
          "test@example.com",
          "password123",
        ]),
      encryptPassword: function (): void {
        throw new Error("Function not implemented.");
      }
    };

    (PostgreHelper.executeQuery as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    try {
      await signUpUserRepository.execute(userEntity);
    } catch (error) {
      expect(error).toEqual(new Error("Database error"));
    }
  });
});
