import PostgreHelper from "infra/helpers/postgre-helper";
import { ISetUserStoreRepository } from "../@interfaces/users-respository.interfaces";

export default class SetUserStoreRepository implements ISetUserStoreRepository {
  async execute({ userId, storeId }: { userId: number, storeId: number }): Promise<void> {
    await PostgreHelper.executeQuery(
      `
        UPDATE users
        SET store_id = $1
        WHERE id = $2;
      `,
      [userId, storeId],
    );
  }
}
