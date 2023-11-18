import { createLogger, transports, format } from "winston";

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
    format.colorize(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [new transports.Console({ level: "info" })],
});

export default logger;
