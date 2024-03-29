import StoreEntity from 'domain/entities/store-entity';

describe('StoreEntity', () => {
  test('should return an array with the store details', () => {
    const store = new StoreEntity({
      name: 'Store Name',
      address: 'Store Address',
      city: 'Store City',
      country: 'Store Country',
      phone: '123',
      category: 'TI',
      subdomain: 'mystore',
    });
    const expectedArray = [
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
      name: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      category: '',
      subdomain: '',
    });
    const expectedArray = ['', '', '', '', '', '', ''];
    expect(store.getArray()).toEqual(expectedArray);
  });

  test('should return an array with the store details when some fields are empty', () => {
    const store = new StoreEntity({
      name: 'Store Name',
      address: '',
      city: '',
      country: 'Store Country',
      phone: '123',
      category: 'TI',
      subdomain: 'mystore',
    });
    const expectedArray = [
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
