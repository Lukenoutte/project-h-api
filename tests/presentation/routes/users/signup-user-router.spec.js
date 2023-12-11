import SignUpUserRouter from "src/presentation/routers/users/signup-user-router";

describe("SignUpUserRouter", () => {
  let signUpUserRouter;
  let signUpUserUseCaseMock;

  beforeEach(() => {
    signUpUserUseCaseMock = {
      execute: jest.fn(),
    };

    signUpUserRouter = new SignUpUserRouter({
      signUpUserUseCase: signUpUserUseCaseMock,
    });
  });

  describe("validate", () => {
    it("should return isValid true if validation passes", async () => {
      const body = {
        name: "John Doe",
        email: "john@gmail.com",
        password: "password123",
      };
      const result = await signUpUserRouter.validate(body);
      expect(result.isValid).toBe(true);
    });

    it("should return isValid false and error details if validation fails", async () => {
      const body = {
        name: "John Doe",
        email: "invalid_email",
        password: "short",
      };
      const result = await signUpUserRouter.validate(body);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("#route", () => {
    it("should return 400 Bad Request if the request is invalid", async () => {
      const invalidHttpRequest = null;
      const response = await signUpUserRouter.route(invalidHttpRequest);
      expect(response.statusCode).toBe(500);
    });

    it("should return 400 Bad Request if validation fails", async () => {
      const invalidHttpRequest = {
        body: {
          name: "John Doe",
          email: "invalid_email",
          password: "short",
        },
      };
      const response = await signUpUserRouter.route(invalidHttpRequest);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 201 Created if sign-up is successful", async () => {
      const validHttpRequest = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
      };

      signUpUserUseCaseMock.execute.mockResolvedValue("user_id");
      const response = await signUpUserRouter.route(validHttpRequest);

      expect(response.statusCode).toBe(201);
      expect(response.body).toBe("user_id");
    });

    it("should return 409 Conflict if the user already exists", async () => {
      const validHttpRequest = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
      };

      signUpUserUseCaseMock.execute.mockRejectedValue({
        name: "AlreadyExistsError",
        message: "User already exists",
      });

      const response = await signUpUserRouter.route(validHttpRequest);

      expect(response.statusCode).toBe(409);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 500 Internal Server Error for other errors", async () => {
      const validHttpRequest = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
      };

      signUpUserUseCaseMock.execute.mockRejectedValue(new Error("Some error"));
      const response = await signUpUserRouter.route(validHttpRequest);
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error");
    });
  });
});
