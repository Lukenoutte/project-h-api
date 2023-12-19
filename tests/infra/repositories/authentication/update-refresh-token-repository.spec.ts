import PostgreHelper from "infra/helpers/postgre-helper";
import UpdateRefreshTokenRepository from "infra/repositories/authentication/update-refresh-token-repository";

jest.mock("infra/helpers/postgre-helper");

describe("UpdateRefreshTokenRepository", () => {
  const executeQuerySpy = jest.spyOn(PostgreHelper, "executeQuery");
  const updateRefreshTokenRepository = new UpdateRefreshTokenRepository();

  beforeEach(() => {
    executeQuerySpy.mockClear();
  });

  it("should execute query with correct parameters", async () => {
    const currentToken = "currentToken";
    const newToken = "newToken";
    await updateRefreshTokenRepository.execute({ currentToken, newToken });
    expect(executeQuerySpy).toHaveBeenCalledWith(
      `
      UPDATE refresh_tokens
      SET token = $2
      WHERE token = $1;
      `,
      [currentToken, newToken],
    );
  });

  it("should throw error if executeQuery fails", async () => {
    const error = new Error("Test error");
    executeQuerySpy.mockImplementationOnce(() => Promise.reject(error));
    const currentToken = "currentToken";
    const newToken = "newToken";
    await expect(
      updateRefreshTokenRepository.execute({ currentToken, newToken }),
    ).rejects.toThrow(error);
  });
});
