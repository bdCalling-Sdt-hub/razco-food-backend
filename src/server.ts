import colors from "colors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app";
import config from "./config";
import { SocketHelper } from "./helpers/socketHelper";
import { errorLogger, logger } from "./shared/logger";

//uncaught exception
process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  process.exit(1);
});

let server: any;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(colors.green("♻️  Database connected successfully"));

    const port =
      typeof config.port === "number" ? config.port : parseInt(config.port!);
    //app listening here
    server = app.listen(port, config.ip_address as string, () => {
      logger.info(colors.bold.yellow(`📢 Application Running on port:${port}`));
    });

    //socket operation here
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
      },
    });
    SocketHelper.socket(io);
  } catch (error) {
    errorLogger.error(error);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

//sigterm
process.on("SIGTERM", () => {
  logger.info("SIGTERM IS RECEIVED!");
  if (server) {
    server.close();
  }
});
