import PostgreHelper from "infra/helpers/postgre-helper";
import CreateRefreshTokenRepository from "infra/repositories/authentication/create-refresh-token-repository";

jest.mock("infra/helpers/postgre-helper");

describe("CreateRefreshTokenRepository", () => {
  const sut = new CreateRefreshTokenRepository();

  it("should call PostgreHelper.executeQuery once", async () => {
    const userId = 1;
    const token = "any_token";
    await sut.execute({ userId, token });
    expect(PostgreHelper.executeQuery).toHaveBeenCalledTimes(1);
  });

  it("should call PostgreHelper.executeQuery with correct query", async () => {
    const userId = 1
    const token = "any_token";

    PostgreHelper.executeQuery = jest.fn();

    await sut.execute({ userId, token });

    expect(PostgreHelper.executeQuery).toHaveBeenCalledWith(
      `
      INSERT INTO refresh_tokens
        (user_id, token)
      VALUES
        ($1, $2);
      `,
      [userId, token],
    );
  });
});
