import { IStore, IStoreEntity } from './@interfaces/store-entity.interfaces';

export default class StoreEntity implements IStoreEntity {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  category: string;
  subdomain: string;

  constructor({
    name,
    address,
    city,
    country,
    phone,
    category,
    subdomain,
  }: IStore) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phone = phone;
    this.category = category;
    this.subdomain = subdomain;
  }

  getArray(): string[] {
    return [
      this.name,
      this.address,
      this.city,
      this.country,
      this.phone,
      this.category,
      this.subdomain,
    ];
  }
}
