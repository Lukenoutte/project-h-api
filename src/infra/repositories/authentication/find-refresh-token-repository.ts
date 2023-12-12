import PostgreHelper from "src/infra/helpers/postgre-helper";

interface IRefreshTokenParams {
  userId: string;
  token: string;
}

export default class FindRefreshTokenRepository {
  async execute({ userId, token }: IRefreshTokenParams) {
    let query;
    let queryParams;
    if (userId) {
      query = "SELECT * FROM refresh_tokens WHERE user_id = $1;";
      queryParams = [userId];
    } else if (token) {
      query = "SELECT * FROM refresh_tokens WHERE token = $1;";
      queryParams = [token];
    }
    const { rows } = await PostgreHelper.executeQuery(query, queryParams);
    return rows[0];
  }
}
