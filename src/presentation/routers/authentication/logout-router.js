import logger from "src/main/configs/logger";
import HttpResponse from "../../helpers/http-response";

export default class LogoutRouter {
  #logoutUseCase;

  constructor({ logoutUseCase }) {
    this.#logoutUseCase = logoutUseCase;
  }

  async route(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      await this.#logoutUseCase.execute({
        userId: httpRequest.userId,
      });
      return HttpResponse.ok();
    } catch (error) {
      logger.error("LogoutError", error);
      return HttpResponse.serverError(error);
    }
  }
}
