export interface IStoreEntity {
  name: string;
  category: string;
  subdomain: string;
  masterId: number;
  getArray: () => string[];
}

export interface IStore {
  name: string;
  category: string;
  subdomain: string;
  masterId: number;
}