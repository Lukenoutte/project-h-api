import PostgreHelper from "infra/helpers/postgre-helper";
import DeleteRefreshTokenRepository from "infra/repositories/authentication/delete-refresh-token-repository";

jest.mock("infra/helpers/postgre-helper", () => ({
  executeQuery: jest.fn(),
}));

describe("DeleteRefreshTokenRepository", () => {
  const mockExecuteQuery = PostgreHelper.executeQuery;
  const deleteRefreshTokenRepository = new DeleteRefreshTokenRepository();

  beforeEach(() => {
    mockExecuteQuery.mockClear();
  });

  it("should execute query with correct parameters", async () => {
    const userId = "testUserId";
    await deleteRefreshTokenRepository.execute({ userId });
    expect(mockExecuteQuery).toHaveBeenCalledWith(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = $1;
      `,
      [userId],
    );
  });

  it("should throw error if executeQuery fails", async () => {
    const error = new Error("Test error");
    mockExecuteQuery.mockImplementationOnce(() => Promise.reject(error));
    const userId = "testUserId";
    await expect(
      deleteRefreshTokenRepository.execute({ userId }),
    ).rejects.toThrow(error);
  });
});
