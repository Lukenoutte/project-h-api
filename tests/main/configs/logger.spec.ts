import logger from "main/configs/logger";

jest.mock("winston", () => {
  const mFormat = {
    combine: jest.fn().mockReturnValue({}),
    timestamp: jest.fn(),
    colorize: jest.fn(),
    printf: jest.fn(),
  };
  const mTransports = {
    Console: jest.fn(),
  };
  const mLogger = {
    info: jest.fn(),
  };
  return {
    format: mFormat,
    transports: mTransports,
    createLogger: jest.fn(() => mLogger),
  };
});

const { createLogger, format, transports } = require("winston");

describe("Logger", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should create logger correctly", () => {
    const info = {
      timestamp: 123,
      level: "info",
      message: "haha",
    };
    logger.info(info.message);
    expect(format.combine).toHaveBeenCalledTimes(1);
    expect(format.timestamp).toHaveBeenCalledWith({ format: "DD/MM/YYYY HH:mm:ss" });
    expect(format.colorize).toHaveBeenCalledTimes(1);
    expect(format.printf).toHaveBeenCalledWith(expect.any(Function));
    expect(transports.Console).toHaveBeenCalledWith({ level: "info" });
    expect(createLogger).toHaveBeenCalledWith({
      format: expect.any(Object),
      transports: expect.any(Array),
    });
  });
});
