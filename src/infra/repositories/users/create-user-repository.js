import PostgreHelper from "../../helpers/postgre-helper";

class CreateUserRepository {
  async execute(userEntity) {
    PostgreHelper.executeQuery(
      `
      INSERT INTO users
        (name, email, address, city, country)
      VALUES
        ($1, $2, $3, $4, $5);
      `,
      userEntity.getArray(),
    );
  }
}

export default CreateUserRepository;
