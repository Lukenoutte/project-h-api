import PostgreHelper from "../../helpers/postgre-helper";

export default class FindUserRepository {
  async execute({ email }) {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email],
    );
    if (!rows.length) return false;
    return rows[0];
  }
}
