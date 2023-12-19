import logger from "main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { ISignOutUseCase } from "domain/usecases/@interfaces/authentication-usecases.interfaces";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";
import { Request } from "express";
import { IRouterNoValidation } from "../@interfaces/router.interfaces";

export default class SignOutRouter implements IRouterNoValidation {
  #signOutUseCase;

  constructor({ signOutUseCase }: { signOutUseCase: ISignOutUseCase }) {
    this.#signOutUseCase = signOutUseCase;
  }

  async route(httpRequest: Request): Promise<IHttpResponse> {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      await this.#signOutUseCase.execute({
        userId: httpRequest.userId,
      });
      return HttpResponse.ok({});
    } catch (error) {
      logger.error("SignOutError", error);
      if (error instanceof Error) return HttpResponse.serverError(error.message);
      return HttpResponse.serverError('SignOutError');
    }
  }
}
