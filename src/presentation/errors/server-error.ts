export default class ServerError extends Error {
  constructor(stack) {
    super("Internal Server Error");
    this.stack = stack;
    this.name = "ServerError";
  }
}