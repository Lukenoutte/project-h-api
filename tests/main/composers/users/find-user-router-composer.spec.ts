import FindUserRouter from "presentation/routers/users/find-user-router";
import FindUserUseCase from "domain/usecases/users/find-user-usecase";
import FindUserByIdRepository from "infra/repositories/users/find-user-by-id-repository";
import FindUserRouterComposer from "main/composers/users/find-user-router-composer";

jest.mock("domain/usecases/users/find-user-usecase");
jest.mock("presentation/routers/users/find-user-router");
jest.mock("infra/repositories/users/find-user-by-id-repository");
jest.mock("infra/helpers/bcrypt-helper");
jest.mock("infra/repositories/users/find-user-by-email-repository");
jest.mock("presentation/errors");

describe("FindUserRouterComposer", () => {
  it("Should compose a create user router", () => {
    const findUserByIdRepository = new FindUserByIdRepository();
    const findUserUseCase = new FindUserUseCase({
        findUserByIdRepository
    });
    const findUserRouter = new FindUserRouter({ findUserUseCase });
    jest
      .spyOn(FindUserRouterComposer, "compose")
      .mockImplementation(() => findUserRouter);
    expect(FindUserRouterComposer.compose()).toBe(findUserRouter);
  });
});
