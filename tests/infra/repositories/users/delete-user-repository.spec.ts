import PostgreHelper from "infra/helpers/postgre-helper";
import { IDeleteUserRepository } from "infra/repositories/@interfaces/users-respository.interfaces";
import DeleteUserRepository from "infra/repositories/users/delete-user-repository";

jest.mock("infra/helpers/postgre-helper");

describe("DeleteUserRepository", () => {
  let deleteUserRepository: IDeleteUserRepository;
  let email: string;

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
    (PostgreHelper.executeQuery as jest.Mock).mockResolvedValue(result);
    const response = await deleteUserRepository.execute({ email });
    expect(response).toEqual(result);
  });

  it("Should throw error if executeQuery throws an error", async () => {
    const error = new Error("Test error");
    (PostgreHelper.executeQuery as jest.Mock).mockRejectedValue(error);
    await expect(deleteUserRepository.execute({ email })).rejects.toThrow(
      error,
    );
  });
});
