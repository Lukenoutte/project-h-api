import PostgreHelper from "src/infra/helpers/postgre-helper";
import FindRefreshTokenRepository from "src/infra/repositories/authentication/find-refresh-token-repository";

jest.mock("src/infra/helpers/postgre-helper", () => ({
  executeQuery: jest.fn(),
}));

describe("FindRefreshTokenRepository", () => {
  const mockExecuteQuery = PostgreHelper.executeQuery;
  const repository = new FindRefreshTokenRepository();

  it("should return the first row of the query result when userId is provided", async () => {
    const userId = "testUserId";
    const mockRow = { user_id: userId, token: "testToken" };
    mockExecuteQuery.mockResolvedValueOnce({ rows: [mockRow] });

    const result = await repository.execute({ userId });

    expect(result).toEqual(mockRow);
    expect(mockExecuteQuery).toHaveBeenCalledWith(
      "SELECT * FROM refresh_tokens WHERE user_id = $1;",
      [userId],
    );
  });

  it("should return the first row of the query result when token is provided", async () => {
    const token = "testToken";
    const mockRow = { user_id: "testUserId", token };
    mockExecuteQuery.mockResolvedValueOnce({ rows: [mockRow] });

    const result = await repository.execute({ token });

    expect(result).toEqual(mockRow);
    expect(mockExecuteQuery).toHaveBeenCalledWith(
      "SELECT * FROM refresh_tokens WHERE token = $1;",
      [token],
    );
  });

  it("should return null when no userId or token is provided", async () => {
    mockExecuteQuery.mockResolvedValueOnce({ rows: [] });

    const result = await repository.execute({});

    expect(result).toBeFalsy();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
