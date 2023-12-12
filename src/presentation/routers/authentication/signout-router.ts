import logger from "main/configs/logger";
import HttpResponse from "../../helpers/http-response";

export default class SignOutRouter {
  #signOutUseCase;

  constructor({ signOutUseCase }) {
    this.#signOutUseCase = signOutUseCase;
  }

  async route(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      await this.#signOutUseCase.execute({
        userId: httpRequest.userId,
      });
      return HttpResponse.ok();
    } catch (error) {
      logger.error("SignOutError", error);
      return HttpResponse.serverError(error);
    }
  }
}
