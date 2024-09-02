import { IRouter } from "presentation/routers/@interfaces/router.interfaces";
import FindStoreRouter from "presentation/routers/stores/find-store-router";
import FindStoreUseCase from "domain/usecases/stores/find-store-usecase";
import { Request } from "express";
import { IFindStoreUseCase } from "domain/usecases/@interfaces/stores-usecases.interfaces";
import { IKeyCaseHelper } from "infra/helpers/@interfaces/helper.interfaces";

describe("FindStoreRouter", () => {
  let findStoreRouter: IRouter;
  let findStoreUseCaseMock: IFindStoreUseCase;
  let keyCaseHelper: IKeyCaseHelper;
  
  const findStoreByMasterIdRespositoryMock = {
    execute: jest.fn(),
  };

  const mockRequest = (body: object): Partial<Request> => {
    const req: Partial<Request> = {
      body,
      params: {},
      query: {},
    };
    return req;
  };

  beforeEach(() => {
    keyCaseHelper = {
      snakeCaseToCamelCase: jest.fn((data: object | any[]) => data)
    }
    findStoreUseCaseMock = new FindStoreUseCase({
        findStoreByMasterIdRespository: findStoreByMasterIdRespositoryMock,
        keyCaseHelper
    });

    findStoreRouter = new FindStoreRouter({
      findStoreUseCase: findStoreUseCaseMock,
    });
  });

  describe("validate", () => {
    it("should return isValid true if validation passes", async () => {
      const body = {
        masterId: '1'
      };
      if (findStoreRouter.validate) {
        const result = await findStoreRouter.validate(body);
        expect(result.isValid).toBe(true);
      } else fail("validate is not defined on findStoreRouter")
    });

    it("should return isValid false and error details if validation fails", async () => {
      const body = {};
      if (findStoreRouter.validate) {
        const result = await findStoreRouter.validate(body);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
      } else fail("validate is not defined on findStoreRouter")
    });
  });

  describe("#route", () => {
    it("should return 400 Bad Request if validation fails", async () => {
      const body = { masterId: null }
      const req = mockRequest(body) as Request
      const response = await findStoreRouter.route(req);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });
});
