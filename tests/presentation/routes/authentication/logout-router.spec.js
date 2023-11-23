import LogoutRouter from "src/presentation/routers/authentication/logout-router";
import LogoutUseCase from "src/domain/usecases/authentication/logout-usecase";
import HttpResponse from "src/presentation/helpers/http-response";

jest.mock("src/main/configs/logger");
jest.mock("src/presentation/helpers/http-response");
jest.mock("src/domain/usecases/authentication/logout-usecase");

describe("LogoutRouter", () => {
  it("Should execute the logout use case and return a ok response", async () => {
    const logoutUseCase = new LogoutUseCase();
    const logoutRouter = new LogoutRouter({ logoutUseCase });
    const httpRequest = { userId: "123" };
    logoutUseCase.execute = jest.fn().mockResolvedValue();
    const response = await logoutRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.ok());
  });

  it("Should log an error and return a server error response when an error occurs", async () => {
    const logoutUseCase = new LogoutUseCase();
    const logoutRouter = new LogoutRouter({ logoutUseCase });
    const httpRequest = { userId: "123" };
    const error = new Error("Test error");
    logoutUseCase.execute = jest.fn().mockRejectedValue(error);
    const response = await logoutRouter.route(httpRequest);
    expect(response).toEqual(HttpResponse.serverError(error));
  });
});
