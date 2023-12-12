import PostgreHelper from "src/infra/helpers/postgre-helper";

interface IRefreshTokenParams {
  userId: string;
  token: string;
}

export default class CreateRefreshTokenRepository {
  async execute({ userId, token }: IRefreshTokenParams) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO refresh_tokens
        (user_id, token)
      VALUES
        ($1, $2);
      `,
      [userId, token],
    );
  }
}
