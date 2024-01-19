import StoreEntity from 'domain/entities/store-entity';

describe('StoreEntity', () => {
  test('should return an array with the store details', () => {
    const store = new StoreEntity({
      userId: 1,
      name: 'Store Name',
      category: 'TI',
      subdomain: 'mystore',
    });
    const expectedArray = [
      'Store Name',
      'TI',
      'mystore',
    ];
    expect(store.getArray()).toEqual(expectedArray);
  });

  test('should return an array with the store details when all fields are empty', () => {
    const store = new StoreEntity({
      userId: 0,
      name: '',
      category: '',
      subdomain: '',
    });
    const expectedArray = ['', '', ''];
    expect(store.getArray()).toEqual(expectedArray);
  });

  test('should return an array with the store details when some fields are empty', () => {
    const store = new StoreEntity({
      userId: 1,
      name: 'Store Name',
      category: 'TI',
      subdomain: 'mystore',
    });
    const expectedArray = [
      'Store Name',
      'TI',
      'mystore',
    ];
    expect(store.getArray()).toEqual(expectedArray);
  });
});
