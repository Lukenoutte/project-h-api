import SetUserStoreRepository from 'infra/repositories/users/set-user-store-repository';
import PostgreHelper from 'infra/helpers/postgre-helper';

jest.mock('infra/helpers/postgre-helper');

describe('SetUserStoreRepository', () => {
  let setUserStoreRepository: SetUserStoreRepository;

  beforeEach(() => {
    setUserStoreRepository = new SetUserStoreRepository();
  });

  it('should execute the query to update the user store', async () => {
    const userId = 1;
    const storeId = 2;

    await setUserStoreRepository.execute({ userId, storeId });

    expect(PostgreHelper.executeQuery).toHaveBeenCalledWith(
      `
        UPDATE users
        SET store_id = $1
        WHERE id = $2;
      `,
      [userId, storeId],
    );
  });

  it('should throw an error if the database query fails', async () => {
    const userId = 1;
    const storeId = 2;
    const errorMessage = 'Database error';

    (PostgreHelper.executeQuery as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(setUserStoreRepository.execute({ userId, storeId })).rejects.toThrow(errorMessage);
  });
});
