import PostgreHelper from "../../helpers/postgre-helper";

export default class DeleteUserRepository {
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
