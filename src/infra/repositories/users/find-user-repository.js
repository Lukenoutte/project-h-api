import PostgreHelper from "../../helpers/postgre-helper";

export default class FindUserRepository {
  async execute({ email }) {
    PostgreHelper.executeQuery(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email],
    );
  }
}