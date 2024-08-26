import { string, object } from "yup";
import logger from "main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { IFindUserUseCase } from "domain/usecases/@interfaces/users-usecases.interfaces";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";
import { Request } from "express";

interface IFindUserParams {
 userId: string;
}

export default class FindUserRouter {
  #findUserUseCase;

  constructor({ findUserUseCase }: { findUserUseCase: IFindUserUseCase }) {
    this.#findUserUseCase = findUserUseCase;
  }

  async validate(params: IFindUserParams): Promise<{ isValid: boolean, error: object }> {
    try {
      const userSchema = object({
        userId: string().required(),
      });
      await userSchema.validate(params);
      return { isValid: true, error: {} };
    } catch (error) {
      if (error instanceof Error) {
        const { name, message } = error;
        return { error: { name, message }, isValid: false };
      }
      return { error: { 
        name: 'ValidationError', 
        message: 'Something went wrong!' 
      }, 
        isValid: false 
      };
    }
  }

  async route(httpRequest: Request): Promise<IHttpResponse> {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      const { userId } = { ...httpRequest };
      const { isValid, error } = await this.validate({ userId });
      if (!isValid) return HttpResponse.badRequest(error);
      const user = await this.#findUserUseCase.execute(
        { userId:  parseInt(userId) }
      );
      return HttpResponse.ok(user);
    } catch (error) {
      logger.error("FindUserError", error);
      if (error instanceof Error) return HttpResponse.serverError(error.message);
      return HttpResponse.serverError('FindUserError');
    }
  }
}
