import PostgreHelper from "infra/helpers/postgre-helper";
import FindUserRepository from "infra/repositories/users/find-user-repository";

jest.mock("infra/helpers/postgre-helper");

describe("FindUserRepository", () => {
  const email = "test@example.com";
  const user = { id: 1, email: "test@example.com", name: "Test User" };

  beforeEach(() => {
    (PostgreHelper.executeQuery as jest.Mock).mockClear();
  });

  it("Should execute a query with the provided email", async () => {
    (PostgreHelper.executeQuery as jest.Mock).mockResolvedValue({ rows: [user] });

    const repository = new FindUserRepository();
    const result = await repository.execute({ email });

    expect(PostgreHelper.executeQuery).toHaveBeenCalledWith(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email],
    );
    expect(result).toEqual(user);
  });

  it("Should return null if no user is found", async () => {
    (PostgreHelper.executeQuery as jest.Mock).mockResolvedValue({ rows: [] });

    const repository = new FindUserRepository();
    const result = await repository.execute({ email });

    expect(result).toBeFalsy();
  });

  it("Should throw an error if the query execution fails", async () => {
    const error = new Error("Query execution failed");
    (PostgreHelper.executeQuery as jest.Mock).mockRejectedValue(error);

    const repository = new FindUserRepository();

    await expect(repository.execute({ email })).rejects.toThrow(error);
  });
});
