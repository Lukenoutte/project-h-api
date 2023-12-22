import StoreEntity from 'domain/entities/store-entity';

describe('StoreEntity', () => {
  test('should return an array with the store details', () => {
    const store = new StoreEntity({
      userId: 1,
      name: 'Store Name',
      address: 'Store Address',
      city: 'Store City',
      country: 'Store Country',
      phone: '123',
      category: 'TI',
      subdomain: 'mystore',
    });
    const expectedArray = [
      1,
      'Store Name',
      'Store Address',
      'Store City',
      'Store Country',
      '123',
      'TI',
      'mystore',
    ];
    expect(store.getArray()).toEqual(expectedArray);
  });

  test('should return an array with the store details when all fields are empty', () => {
    const store = new StoreEntity({
      userId: 0,
      name: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      category: '',
      subdomain: '',
    });
    const expectedArray = [0, '', '', '', '', '', '', ''];
    expect(store.getArray()).toEqual(expectedArray);
  });

  test('should return an array with the store details when some fields are empty', () => {
    const store = new StoreEntity({
      userId: 1,
      name: 'Store Name',
      address: '',
      city: '',
      country: 'Store Country',
      phone: '123',
      category: 'TI',
      subdomain: 'mystore',
    });
    const expectedArray = [
      1,
      'Store Name',
      '',
      '',
      'Store Country',
      '123',
      'TI',
      'mystore',
    ];
    expect(store.getArray()).toEqual(expectedArray);
  });
});
