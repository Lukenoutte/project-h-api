import SignOutRouter from "src/presentation/routers/authentication/signout-router";
import SignOutUseCase from "src/domain/usecases/authentication/signout-usecase";
import HttpResponse from "src/presentation/helpers/http-response";

jest.mock("src/main/configs/logger");
jest.mock("src/presentation/helpers/http-response");
jest.mock("src/domain/usecases/authentication/signout-usecase");

describe("SignOutRouter", () => {
  it("Should execute the signOut use case and return a ok response", async () => {
    const signOutUseCase = new SignOutUseCase();
    const signOutRouter = new SignOutRouter({ signOutUseCase });
    const httpRequest = { userId: "123" };
    signOutUseCase.execute = jest.fn().mockResolvedValue();
    const response = await signOutRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.ok());
  });

  it("Should log an error and return a server error response when an error occurs", async () => {
    const signOutUseCase = new SignOutUseCase();
    const signOutRouter = new SignOutRouter({ signOutUseCase });
    const httpRequest = { userId: "123" };
    const error = new Error("Test error");
    signOutUseCase.execute = jest.fn().mockRejectedValue(error);
    const response = await signOutRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.serverError(error));
  });
});
