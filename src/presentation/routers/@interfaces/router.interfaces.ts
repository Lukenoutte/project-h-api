import { Request } from "express";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";

export interface IRouter {
  validate?: (params: any) => Promise<object>;
  route: (httpRequest: Request) => Promise<IHttpResponse>
}