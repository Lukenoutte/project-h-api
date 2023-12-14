import { IStoreEntity } from "./@interfaces/store-entity.interfaces"

interface IStoreConstructor {
  name: string;
  address: string;
  city: string;
  country: string;
}

export default class StoreEntity implements IStoreEntity {
  name: string;
  address: string;
  city: string;
  country: string;

  constructor({ name, address, city, country }: IStoreConstructor) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
  }

  getArray(): string[] {
    return [this.name, this.address, this.city, this.country];
  }
}
