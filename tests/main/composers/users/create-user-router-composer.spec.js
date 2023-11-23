import CreateUserUseCase from "src/domain/usecases/users/create-user-usecase";
import CreateUserRouter from "src/presentation/routers/users/create-user-router";
import CreateUserRepository from "src/infra/repositories/users/create-user-repository";
import BcryptHelper from "src/infra/helpers/bcrypt-helper";
import FindUserRepository from "src/infra/repositories/users/find-user-repository";
import { AlreadyExistsError } from "src/presentation/errors";
import CreateUserRouterComposer from "src/main/composers/users/create-user-router-composer";

jest.mock("src/domain/usecases/users/create-user-usecase");
jest.mock("src/presentation/routers/users/create-user-router");
jest.mock("src/infra/repositories/users/create-user-repository");
jest.mock("src/infra/helpers/bcrypt-helper");
jest.mock("src/infra/repositories/users/find-user-repository");
jest.mock("src/presentation/errors");

describe("CreateUserRouterComposer", () => {
  it("Should compose a create user router", () => {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const alreadyExistsError = new AlreadyExistsError();
    const createUserUseCase = new CreateUserUseCase({
      createUserRepository: new CreateUserRepository(),
      bcryptHelper,
      findUserRepository,
      alreadyExistsError,
    });
    const createUserRouter = new CreateUserRouter({ createUserUseCase });
    jest
      .spyOn(CreateUserRouterComposer, "compose")
      .mockImplementation(() => createUserRouter);
    expect(CreateUserRouterComposer.compose()).toBe(createUserRouter);
  });
});
