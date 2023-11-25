import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class SignUpStoreRepository {
  async execute(storeEntity) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO stores
        (name, address, city, country)
      VALUES
        ($1, $2, $3, $4);
      `,
      storeEntity.getArray(),
    );
  }
}
