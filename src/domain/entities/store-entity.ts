import { IStore, IStoreEntity } from './@interfaces/store-entity.interfaces';

export default class StoreEntity implements IStoreEntity {
  name: string;
  category: string;
  subdomain: string;
  masterId: number;

  constructor({
    name,
    category,
    subdomain,
    masterId,
  }: IStore) {
    this.name = name;
    this.category = category;
    this.subdomain = subdomain;
    this.masterId = masterId;
  }

  getArray(): any[] {
    return [
      this.name,
      this.category,
      this.subdomain,
      this.masterId
    ];
  }
}
