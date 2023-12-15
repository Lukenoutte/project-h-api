import { ServerError } from "presentation/errors";
import HttpResponse from "presentation/helpers/http-response";

jest.mock("src/presentation/errors");

describe("HttpResponse", () => {
  it("Should return a ok response", () => {
    const body = {};
    const response = HttpResponse.ok({});
    expect(response).toEqual({ statusCode: 200, body });
  });

  it("Should return a created response", () => {
    const body = { error: "test" };
    const response = HttpResponse.created(body);
    expect(response).toEqual({ statusCode: 201, body });
  });

  it("Should return a conflict response", () => {
    const error = {};
    const response = HttpResponse.conflict(error);
    expect(response).toEqual({ statusCode: 409, body: { error } });
  });

  it("Should return a no content response", () => {
    const response = HttpResponse.noContent();
    expect(response).toEqual({ statusCode: 204 });
  });

  it("Should return a not found response", () => {
    const error = { error: "test" };
    const response = HttpResponse.notFound(error);
    expect(response).toEqual({ statusCode: 404, body: { error } });
  });

  it("Should return a bad request response", () => {
    const error = { error: "test" };
    const response = HttpResponse.badRequest(error);
    expect(response).toEqual({ statusCode: 400, body: { error } });
  });

  it("Should return a server error response", () => {
    const error = "test error";
    const serverError = new ServerError(error);
    const response = HttpResponse.serverError(error);
    expect(response).toEqual({ statusCode: 500, body: { error: serverError } });
  });

  it("Should return an unauthorized error response", () => {
    const error = { error: "test" };
    const response = HttpResponse.unauthorizedError(error);
    expect(response).toEqual({ statusCode: 401, body: { error } });
  });
});
