import PostgreHelper from "infra/helpers/postgre-helper";
import FindUserByIdRepository from "infra/repositories/users/find-user-by-id-repository";

jest.mock("infra/helpers/postgre-helper");

describe("FindUserByIdRepository", () => {
  const userId = 1;
  const user = { id: 1, email: "test@example.com", name: "Test User" };

  beforeEach(() => {
    (PostgreHelper.executeQuery as jest.Mock).mockClear();
  });

  it("Should execute a query with the provided id", async () => {
    (PostgreHelper.executeQuery as jest.Mock).mockResolvedValue({ rows: [user] });

    const repository = new FindUserByIdRepository();
    const result = await repository.execute({ userId });

    expect(PostgreHelper.executeQuery).toHaveBeenCalledWith(
      `
      SELECT * FROM users WHERE id = $1;
      `,
      [userId],
    );
    expect(result).toEqual(user);
  });

  it("Should return null if no user is found", async () => {
    (PostgreHelper.executeQuery as jest.Mock).mockResolvedValue({ rows: [] });

    const repository = new FindUserByIdRepository();
    const result = await repository.execute({ userId });

    expect(result).toBeFalsy();
  });

  it("Should throw an error if the query execution fails", async () => {
    const error = new Error("Query execution failed");
    (PostgreHelper.executeQuery as jest.Mock).mockRejectedValue(error);

    const repository = new FindUserByIdRepository();

    await expect(repository.execute({ userId })).rejects.toThrow(error);
  });
});
