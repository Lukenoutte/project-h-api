import UserEntity from "domain/entities/user-entity";
import { IBcryptHelper } from "infra/helpers/@interfaces/helper.interfaces";

const mockBcryptHelper: IBcryptHelper = {
  hashPassword: jest.fn(async (password) => `hashed_${password}`),
  comparePassword: jest.fn(async (plainPassword, hashedPassword) => true)
};

describe("UserEntity", () => {
  it("Should create a user entity", () => {
    const user = new UserEntity({
      level: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      bcryptHelper: mockBcryptHelper,
    });
    expect(user).toBeInstanceOf(UserEntity);
  });

  it("Should encrypt the password", async () => {
    const user = new UserEntity({
      level: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      bcryptHelper: mockBcryptHelper,
    });

    await user.encryptPassword();

    expect(mockBcryptHelper.hashPassword).toHaveBeenCalledWith("password123");
    expect(user.password).toEqual("hashed_password123");
  });

  it("should return an array of user properties", async () => {
    const user = new UserEntity({
      level: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      bcryptHelper: mockBcryptHelper,
    });
    await user.encryptPassword();
    const userArray = user.getArray();
    expect(userArray).toEqual([
      "John Doe",
      "john.doe@example.com",
      "hashed_password123",
      1
    ]);
  });
});
