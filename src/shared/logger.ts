import path from "path";
import winston, { format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(label({ label: "RAZCO-FOOD" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "winston",
        "success",
        "%DATE%-success.log"
      ),
      datePattern: "DD-MM-YYYY-HH",
      maxSize: "20m",
      maxFiles: "1d",
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  format: combine(label({ label: "RAZCO-FOOD" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "winston",
        "errors",
        "%DATE%-error.log"
      ),
      datePattern: "DD-MM-YYYY-HH",
      maxSize: "20m",
      maxFiles: "1d",
    }),
  ],
});

export { errorLogger, logger };
