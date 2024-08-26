import StoreEntity from 'domain/entities/store-entity';

describe('StoreEntity', () => {
  test('should return an array with the store details', () => {
    const store = new StoreEntity({
      name: 'Store Name',
      category: 'TI',
      subdomain: 'mystore',
      masterId: 1
    });
    const expectedArray = [
      'Store Name',
      'TI',
      'mystore',
      1
    ];
    expect(store.getArray()).toEqual(expectedArray);
  });

  test('should return an array with the store details when all fields are empty', () => {
    const store = new StoreEntity({
      name: '',
      category: '',
      subdomain: '',
      masterId: 0
    });
    const expectedArray = ['', '', '', 0];
    expect(store.getArray()).toEqual(expectedArray);
  });

  test('should return an array with the store details when some fields are empty', () => {
    const store = new StoreEntity({
      name: 'Store Name',
      category: 'TI',
      subdomain: 'mystore',
      masterId: 1
    });
    const expectedArray = [
      'Store Name',
      'TI',
      'mystore',
      1
    ];
    expect(store.getArray()).toEqual(expectedArray);
  });
});
