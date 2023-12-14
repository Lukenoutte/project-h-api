import { string, object } from "yup";
import logger from "main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { ISignUpUserUseCase } from "domain/usecases/@interfaces/users-usecases.interfaces";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";

export default class SignUpUserRouter {
  #signUpUserUseCase;

  constructor({ signUpUserUseCase }: { signUpUserUseCase: ISignUpUserUseCase }) {
    this.#signUpUserUseCase = signUpUserUseCase;
  }

  async validate(params) {
    try {
      const userSchema = object({
        name: string().required(),
        email: string().required().email(),
        password: string().required().min(6),
      });
      await userSchema.validate(params);
      return { isValid: true };
    } catch (error) {
      const { name, message } = error;
      return { error: { name, message }, isValid: false };
    }
  }

  async route(httpRequest): Promise<IHttpResponse> {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      const body = { ...httpRequest.body };
      const { isValid, error } = await this.validate(body);
      if (!isValid) return HttpResponse.badRequest(error);
      const result = await this.#signUpUserUseCase.execute(body);
      return HttpResponse.created(result);
    } catch (error) {
      logger.error("SignUpUserError", error);
      if (error.name === "AlreadyExistsError")
        return HttpResponse.conflict(error);
      return HttpResponse.serverError(error);
    }
  }
}
