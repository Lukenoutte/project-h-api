import PostgreHelper from "infra/helpers/postgre-helper";
import { ISetUserStoreRepository } from "../@interfaces/users-respository.interfaces";

export default class SetUserStoreRepository implements ISetUserStoreRepository {
  async execute({ storeId, userId }: { storeId: number, userId: number }) {
    await PostgreHelper.executeQuery(
      `
      UPDATE users
      SET store_id = $1
      WHERE id = $2;
      `,
      [storeId, userId],
    );
  }
}
