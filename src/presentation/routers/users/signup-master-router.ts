import { string, object } from 'yup';
import logger from 'main/configs/logger';
import HttpResponse from '../../helpers/http-response';
import { ISignUpUserUseCase } from 'domain/usecases/@interfaces/users-usecases.interfaces';
import { IHttpResponse } from 'presentation/helpers/@interfaces/helper.interfaces';
import { IRequest } from '../@interfaces/router.interfaces';

interface ISignUpMasterParams {
  name: string;
  email: string;
  level: number;
  password: string;
}

export default class SignUpMasterRouter {
  #signUpUserUseCase;

  constructor({
    signUpUserUseCase,
  }: {
    signUpUserUseCase: ISignUpUserUseCase;
  }) {
    this.#signUpUserUseCase = signUpUserUseCase;
  }

  async validate(
    params: ISignUpMasterParams
  ): Promise<{ isValid: boolean; error: object }> {
    try {
      const userSchema = object({
        name: string().required(),
        email: string().required().email(),
        password: string().required().min(6),
      });
      await userSchema.validate(params);
      return { isValid: true, error: {} };
    } catch (error) {
      if (error instanceof Error) {
        const { name, message } = error;
        return { error: { name, message }, isValid: false };
      }
      return {
        error: {
          name: 'ValidationError',
          message: 'Something went wrong!',
        },
        isValid: false,
      };
    }
  }

  async route(httpRequest: IRequest): Promise<IHttpResponse> {
    try {
      if (!httpRequest || !httpRequest.body)
        throw new Error('InvalidRequestError');
      const body = { ...httpRequest.body };
      const { isValid, error } = await this.validate(body);
      if (!isValid) return HttpResponse.badRequest(error);
      await this.#signUpUserUseCase.execute({
        ...body,
        level: 1,
      });
      return HttpResponse.created({});
    } catch (error) {
      logger.error('SignUpUserError', error);
      if (error instanceof Error) {
        if (error.name === 'AlreadyExistsError')
          return HttpResponse.conflict(error);
        return HttpResponse.serverError(error.message);
      }
      return HttpResponse.serverError('SignUpUserError');
    }
  }
}
