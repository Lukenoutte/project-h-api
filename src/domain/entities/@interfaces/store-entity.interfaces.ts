export interface IStoreEntity {
  name: string;
  address: string;
  city: string;
  country: string;
  getArray: () => string[];
}