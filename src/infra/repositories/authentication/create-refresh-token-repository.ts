import PostgreHelper from "infra/helpers/postgre-helper";
import { ICreateRefreshTokenRepository } from "../@interfaces/authentication-repository.interfaces"

export default class CreateRefreshTokenRepository implements ICreateRefreshTokenRepository {
  async execute({ userId, token }: { userId: string, token: string }) {
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
