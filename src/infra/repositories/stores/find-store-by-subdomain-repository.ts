import PostgreHelper from "infra/helpers/postgre-helper";
import { IFindStoreBySubdomainRepository } from "../@interfaces/stores-repository.interfaces";
import { IStoreResponse } from "domain/entities/@interfaces/store-entity.interfaces";

export default class FindStoreBySubdomainRepository implements IFindStoreBySubdomainRepository {
  async execute({ subdomain }: { subdomain: string }): Promise<IStoreResponse> {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM stores WHERE subdomain = $1;
      `,
      [subdomain],
    );
    return rows[0];
  }
}
