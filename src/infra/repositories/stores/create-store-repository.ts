import PostgreHelper from "src/infra/helpers/postgre-helper";
import IStoreEntity from "src/domain/entities/interfaces/store-entity.interface"

export default class SignUpStoreRepository {
  async execute(storeEntity: IStoreEntity) {
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
