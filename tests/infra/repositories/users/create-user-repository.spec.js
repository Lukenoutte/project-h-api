import PostgreHelper from "../../../../src/infra/helpers/postgre-helper";
import CreateUserRepository from "../../../../src/infra/repositories/users/create-user-repository";
import DeleteUserRepository from "../../../../src/infra/repositories/users/delete-user-repository";
import { postgreUrl } from "../../../../src/main/configs/env";

const createUserRepository = () => new CreateUserRepository();
const deleteUSerRepository = () => new DeleteUserRepository();

const fakeParams = () => ({
  name: "User Test",
  email: "userTest@gmail.com",
  password: "123456TestPass",
  address: "Test Adress",
  city: "Test City",
  country: "Test Country",
});

const userEntityMock = (userParams) => ({
  getArray: () => {
    const { name, email, password, address, city, country } = userParams;
    return [name, email, password, address, city, country];
  },
});

describe("Create User Repository", () => {
  const userFakeParams = fakeParams();
  const userEntityMocked = userEntityMock(userFakeParams);

  beforeAll(async () => {
    await PostgreHelper.connect(postgreUrl);
  });

  afterAll(async () => {
    const sutDeleteUser = deleteUSerRepository();
    await sutDeleteUser.execute({ email: userFakeParams.email });
    await PostgreHelper.disconnect();
  });

  test("Should be able to create a new user", async () => {
    const sutCreateUser = createUserRepository();
    const { rowCount } = await sutCreateUser.execute(userEntityMocked);
    expect(rowCount).toBe(1);
  });
});
