import SignOutRouter from "src/presentation/routers/authentication/signout-router";
import SignOutUseCase from "src/domain/usecases/authentication/signout-usecase";
import HttpResponse from "src/presentation/helpers/http-response";

jest.mock("src/main/configs/logger");
jest.mock("src/presentation/helpers/http-response");
jest.mock("src/domain/usecases/authentication/signout-usecase");

describe("SignOutRouter", () => {
  it("Should execute the signout use case and return a ok response", async () => {
    const signoutUseCase = new SignOutUseCase();
    const signoutRouter = new SignOutRouter({ signoutUseCase });
    const httpRequest = { userId: "123" };
    signoutUseCase.execute = jest.fn().mockResolvedValue();
    const response = await signoutRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.ok());
  });

  it("Should log an error and return a server error response when an error occurs", async () => {
    const signoutUseCase = new SignOutUseCase();
    const signoutRouter = new SignOutRouter({ signoutUseCase });
    const httpRequest = { userId: "123" };
    const error = new Error("Test error");
    signoutUseCase.execute = jest.fn().mockRejectedValue(error);
    const response = await signoutRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.serverError(error));
  });
});
