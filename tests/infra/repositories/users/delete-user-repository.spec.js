import PostgreHelper from "../../../../src/infra/helpers/postgre-helper";
import DeleteUserRepository from "../../../../src/infra/repositories/users/delete-user-repository";

jest.mock("../../../../src/infra/helpers/postgre-helper");

describe("DeleteUserRepository", () => {
  let deleteUserRepository;
  let email;

  beforeEach(() => {
    deleteUserRepository = new DeleteUserRepository();
    email = "test@email.com";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call executeQuery with correct parameters", async () => {
    await deleteUserRepository.execute({ email });
    expect(PostgreHelper.executeQuery).toHaveBeenCalledWith(
      `
      DELETE FROM users
      WHERE email = $1;
      `,
      [email],
    );
  });

  it("Should return the result of executeQuery", async () => {
    const result = "result";
    PostgreHelper.executeQuery.mockResolvedValue(result);
    const response = await deleteUserRepository.execute({ email });
    expect(response).toEqual(result);
  });

  it("Should throw error if executeQuery throws an error", async () => {
    const error = new Error("Test error");
    PostgreHelper.executeQuery.mockRejectedValue(error);
    await expect(deleteUserRepository.execute({ email })).rejects.toThrow(
      error,
    );
  });
});
