import { Request, Response, NextFunction } from 'express';
import { IHttpResponse } from 'presentation/helpers/@interfaces/helper.interfaces';

export interface IRequest extends Request {}
export interface IResponse extends Response {}
export interface INextFunction extends NextFunction {}

export interface IRouter {
  validate?: (params: any) => Promise<{ isValid: boolean; error: object }>;
  route: (httpRequest: IRequest) => Promise<IHttpResponse>;
}

export interface IRouterNoValidation {
  route: (httpRequest: IRequest) => Promise<IHttpResponse>;
}
