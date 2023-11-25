import logger from "src/main/configs/logger";
import HttpResponse from "../../helpers/http-response";

export default class SignOutRouter {
  #signoutUseCase;

  constructor({ signoutUseCase }) {
    this.#signoutUseCase = signoutUseCase;
  }

  async route(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      await this.#signoutUseCase.execute({
        userId: httpRequest.userId,
      });
      return HttpResponse.ok();
    } catch (error) {
      logger.error("SignOutError", error);
      return HttpResponse.serverError(error);
    }
  }
}
