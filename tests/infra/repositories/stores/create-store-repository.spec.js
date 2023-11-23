import PostgreHelper from "../../../../src/infra/helpers/postgre-helper";
import CreateStoreRepository from "../../../../src/infra/repositories/stores/create-store-repository";

jest.mock("../../../../src/infra/helpers/postgre-helper");

describe("CreateStoreRepository", () => {
  let createStoreRepository;
  let mockStoreEntity;

  beforeEach(() => {
    createStoreRepository = new CreateStoreRepository();
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
    await createStoreRepository.execute(mockStoreEntity);

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
    await expect(createStoreRepository.execute()).rejects.toThrow();
  });

  it("Should throw an error when storeEntity does not have a getArray method", async () => {
    const invalidStoreEntity = {};
    await expect(
      createStoreRepository.execute(invalidStoreEntity),
    ).rejects.toThrow();
  });
});
