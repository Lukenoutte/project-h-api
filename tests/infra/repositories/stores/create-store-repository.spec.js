import PostgreHelper from "src/infra/helpers/postgre-helper";
import SignUpStoreRepository from "src/infra/repositories/stores/create-store-repository";

jest.mock("src/infra/helpers/postgre-helper");

describe("SignUpStoreRepository", () => {
  let signUpStoreRepository;
  let mockStoreEntity;

  beforeEach(() => {
    signUpStoreRepository = new SignUpStoreRepository();
    mockStoreEntity = {
      getArray: jest
        .fn()
        .mockReturnValue(["name", "address", "city", "country"]),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should execute a query to insert a new store", async () => {
    await signUpStoreRepository.execute(mockStoreEntity);

    expect(PostgreHelper.executeQuery).toBeCalledWith(
      `
      INSERT INTO stores
        (name, address, city, country)
      VALUES
        ($1, $2, $3, $4);
      `,
      mockStoreEntity.getArray(),
    );
  });

  it("Should throw an error when storeEntity is not provided", async () => {
    await expect(signUpStoreRepository.execute()).rejects.toThrow();
  });

  it("Should throw an error when storeEntity does not have a getArray method", async () => {
    const invalidStoreEntity = {};
    await expect(
      signUpStoreRepository.execute(invalidStoreEntity),
    ).rejects.toThrow();
  });
});
