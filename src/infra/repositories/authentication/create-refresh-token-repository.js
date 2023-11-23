import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class CreateRefreshTokenRepository {
  async execute({ userId, token }) {
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
