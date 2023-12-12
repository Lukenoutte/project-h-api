import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class FindUserRepository {
  async execute({ email }: { email: string }) {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email],
    );
    return rows[0];
  }
}
