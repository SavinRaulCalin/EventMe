import winston, { Logger } from "winston";

const transports = [];
if (process.env.NODE_ENV !== "development") {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat()),
    })
  );
}

const WinstonLogger: Logger = winston.createLogger({
  level: "silly",
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    winston.format.printf((info) => {
      if (typeof info.message === "object") {
        info.message = JSON.stringify(info.message, null, 3);
      }
      return info.message;
    })
  ),
  transports,
});

export default WinstonLogger;
