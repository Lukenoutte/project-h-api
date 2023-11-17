import PostgreHelper from "../../helpers/postgre-helper";

export default class CreateUserRepository {
  async execute(userEntity) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO users
        (name, email, password, address, city, country)
      VALUES
        ($1, $2, $3, $4, $5, $6);
      `,
      userEntity.getArray(),
    );
  }
}
