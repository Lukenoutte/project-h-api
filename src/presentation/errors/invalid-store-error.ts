export default class InvalidStoreError extends Error {
  constructor() {
    super('InvalidStore');
    this.name = 'InvalidStoreError';
  }
}
