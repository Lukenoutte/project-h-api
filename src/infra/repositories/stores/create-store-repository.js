import PostgreHelper from "../../helpers/postgre-helper";

class CreateStoreRepository {
  async execute(storeEntity) {
    PostgreHelper.executeQuery(
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

export default CreateStoreRepository;
