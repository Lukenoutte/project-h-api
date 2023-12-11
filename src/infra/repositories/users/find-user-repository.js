import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class FindUserRepository {
  /**
   * @param {string} email
   */
  async execute({ email }) {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email],
    );
    return rows[0];
  }
}
