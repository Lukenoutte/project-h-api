import { string, object } from "yup";
import logger from "main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { ISignInUseCase } from "domain/usecases/@interfaces/authentication-usecases.interfaces";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";

export default class SignInRouter {
  #signInUseCase;

  constructor({ signInUseCase }: { signInUseCase: ISignInUseCase }) {
    this.#signInUseCase = signInUseCase;
  }

  async validate(params) {
    try {
      const userSchema = object({
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
      const tokens = await this.#signInUseCase.execute(body);
      return HttpResponse.ok(tokens);
    } catch (error) {
      if (error.name !== "WrongCredentialsError")
        logger.error("SignInError", error);
      return HttpResponse.unauthorizedError(error);
    }
  }
}
