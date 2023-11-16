import LoginUseCase from "../../../domain/usecase/authentication/login-usecase";
import LoginRouter from "../../../presentation/routers/authentication/login-router";

export default class LoginRouterComposer {
  static compose() {
    const loginUseCase = new LoginUseCase();
    return new LoginRouter({ loginUseCase });
  }
}
