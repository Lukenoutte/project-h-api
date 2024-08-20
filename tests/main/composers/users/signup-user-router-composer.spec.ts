import SignUpUserRouter from "presentation/routers/users/signup-user-router";
import SignUpUserUseCase from "domain/usecases/users/signup-user-usecase";
import SignUpUserRepository from "infra/repositories/users/signup-user-repository";
import BcryptHelper from "infra/helpers/bcrypt-helper";
import FindUserByEmailRepository from "infra/repositories/users/find-user-by-email-repository";
import { AlreadyExistsError } from "presentation/errors";
import SignUpUserRouterComposer from "main/composers/users/signup-user-router-composer";

jest.mock("domain/usecases/users/signup-user-usecase");
jest.mock("presentation/routers/users/signup-user-router");
jest.mock("infra/repositories/users/signup-user-repository");
jest.mock("infra/helpers/bcrypt-helper");
jest.mock("infra/repositories/users/find-user-by-email-repository");
jest.mock("presentation/errors");

describe("SignUpUserRouterComposer", () => {
  it("Should compose a create user router", () => {
    const bcryptHelper = new BcryptHelper();
    const findUserByEmailRepository = new FindUserByEmailRepository();
    const alreadyExistsError = new AlreadyExistsError();
    const signUpUserUseCase = new SignUpUserUseCase({
      signUpUserRepository: new SignUpUserRepository(),
      bcryptHelper,
      findUserByEmailRepository,
      alreadyExistsError,
    });
    const signUpUserRouter = new SignUpUserRouter({ signUpUserUseCase });
    jest
      .spyOn(SignUpUserRouterComposer, "compose")
      .mockImplementation(() => signUpUserRouter);
    expect(SignUpUserRouterComposer.compose()).toBe(signUpUserRouter);
  });
});
