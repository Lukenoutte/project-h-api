import UserEntity from "src/domain/entities/user-entity";

const mockBcryptHelper = {
  hashPassword: jest.fn(async (password) => `hashed_${password}`),
};

describe("UserEntity", () => {
  it("Should create a user entity", () => {
    const user = new UserEntity({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      address: "123 Main St",
      city: "Cityville",
      country: "Countryland",
      bcryptHelper: mockBcryptHelper,
    });
    expect(user).toBeInstanceOf(UserEntity);
  });

  it("Should encrypt the password", async () => {
    const user = new UserEntity({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      address: "123 Main St",
      city: "Cityville",
      country: "Countryland",
      bcryptHelper: mockBcryptHelper,
    });

    await user.encryptPassword();

    expect(mockBcryptHelper.hashPassword).toHaveBeenCalledWith("password123");
    expect(user.password).toEqual("hashed_password123");
  });

  it("should return an array of user properties", async () => {
    const user = new UserEntity({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      address: "123 Main St",
      city: "Cityville",
      country: "Countryland",
      bcryptHelper: mockBcryptHelper,
    });
    await user.encryptPassword();
    const userArray = user.getArray();
    expect(userArray).toEqual([
      "John Doe",
      "john.doe@example.com",
      "hashed_password123",
      "123 Main St",
      "Cityville",
      "Countryland",
    ]);
  });
});
