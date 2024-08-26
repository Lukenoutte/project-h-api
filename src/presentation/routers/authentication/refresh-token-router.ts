import { string, object } from "yup";
import logger from "main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { IRefreshTokenUseCase } from "domain/usecases/@interfaces/authentication-usecases.interfaces";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";
import { IRouter } from "../@interfaces/router.interfaces";
import { Request } from "express";

interface IRefreshTokenParams {
  refreshToken: string;
 }

export default class RefreshTokenRouter implements IRouter {
  #refreshTokenUseCase;

  constructor({ refreshTokenUseCase }: { refreshTokenUseCase: IRefreshTokenUseCase }) {
    this.#refreshTokenUseCase = refreshTokenUseCase;
  }

  async validate(params: IRefreshTokenParams): Promise<{ isValid: boolean, error: object }> {
    try {
      const tokenSchema = object({
        refreshToken: string().required(),
        userId: string().required()
      });
      await tokenSchema.validate(params);
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
      if (!httpRequest || !httpRequest.body) {
        return HttpResponse.badRequest(new Error('InvalidRequestError'));
      }
      const body = { ...httpRequest.body };
      const { isValid, error } = await this.validate(
        {...body, userId: httpRequest.userId }
      );
      if (!isValid) return HttpResponse.badRequest(error);
      const accessToken = await this.#refreshTokenUseCase.execute({
        userId: parseInt(httpRequest.userId),
        refreshToken: body.refreshToken,
      });
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      logger.error("RefreshTokenError", error);
      if (error instanceof Error) return HttpResponse.serverError(error.message);
      return HttpResponse.serverError('RefreshTokenError');
    }
  }
}
