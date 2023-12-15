import { ServerError } from "../errors";

export default class HttpResponse {
  static ok(body: string) {
    return {
      statusCode: 200,
      body,
    };
  }

  static created(body: string) {
    return {
      statusCode: 201,
      body,
    };
  }

  static conflict(error: string) {
    return {
      statusCode: 409,
      body: {
        error,
      },
    };
  }

  static noContent() {
    return {
      statusCode: 204,
    };
  }

  static notFound(error: string) {
    return {
      statusCode: 404,
      body: {
        error,
      },
    };
  }

  static badRequest(error: string) {
    return {
      statusCode: 400,
      body: {
        error,
      },
    };
  }

  static serverError(error: string) {
    return {
      statusCode: 500,
      body: {
        error: new ServerError(error),
      },
    };
  }

  static unauthorizedError(error: string) {
    return {
      statusCode: 401,
      body: {
        error,
      },
    };
  }
}
