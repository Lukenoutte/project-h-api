import PostgreHelper from "infra/helpers/postgre-helper";
import FindUserByEmailRepository from "infra/repositories/users/find-user-by-email-repository";

jest.mock("infra/helpers/postgre-helper");

describe("FindUserByEmailRepository", () => {
  const email = "test@example.com";
  const user = { id: 1, email: "test@example.com", name: "Test User" };

  beforeEach(() => {
    (PostgreHelper.executeQuery as jest.Mock).mockClear();
  });

  it("Should execute a query with the provided email", async () => {
    (PostgreHelper.executeQuery as jest.Mock).mockResolvedValue({ rows: [user] });

    const repository = new FindUserByEmailRepository();
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

    const repository = new FindUserByEmailRepository();
    const result = await repository.execute({ email });

    expect(result).toBeFalsy();
  });

  it("Should throw an error if the query execution fails", async () => {
    const error = new Error("Query execution failed");
    (PostgreHelper.executeQuery as jest.Mock).mockRejectedValue(error);

    const repository = new FindUserByEmailRepository();

    await expect(repository.execute({ email })).rejects.toThrow(error);
  });
});
