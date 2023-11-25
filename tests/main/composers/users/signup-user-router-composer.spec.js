import SignUpUserRouter from "src/presentation/routers/users/signup-user-router";
import SignUpUserUseCase from "src/domain/usecases/users/signup-user-usecase";
import SignUpUserRepository from "src/infra/repositories/users/create-user-repository";
import BcryptHelper from "src/infra/helpers/bcrypt-helper";
import FindUserRepository from "src/infra/repositories/users/find-user-repository";
import { AlreadyExistsError } from "src/presentation/errors";
import SignUpUserRouterComposer from "src/main/composers/users/signup-user-router-composer";

jest.mock("src/domain/usecases/users/signup-user-usecase");
jest.mock("src/presentation/routers/users/signup-user-router");
jest.mock("src/infra/repositories/users/create-user-repository");
jest.mock("src/infra/helpers/bcrypt-helper");
jest.mock("src/infra/repositories/users/find-user-repository");
jest.mock("src/presentation/errors");

describe("SignUpUserRouterComposer", () => {
  it("Should compose a create user router", () => {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const alreadyExistsError = new AlreadyExistsError();
    const signUpUserUseCase = new SignUpUserUseCase({
      signUpUserRepository: new SignUpUserRepository(),
      bcryptHelper,
      findUserRepository,
      alreadyExistsError,
    });
    const signUpUserRouter = new SignUpUserRouter({ signUpUserUseCase });
    jest
      .spyOn(SignUpUserRouterComposer, "compose")
      .mockImplementation(() => signUpUserRouter);
    expect(SignUpUserRouterComposer.compose()).toBe(signUpUserRouter);
  });
});
