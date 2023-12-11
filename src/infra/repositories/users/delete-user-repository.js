import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class DeleteUserRepository {
  /**
   * @param {string} email
   */
  execute({ email }) {
    return PostgreHelper.executeQuery(
      `
      DELETE FROM users
      WHERE email = $1;
      `,
      [email],
    );
  }
}
