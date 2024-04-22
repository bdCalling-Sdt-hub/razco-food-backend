import colors from "colors";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(colors.green("🛢️  Database connected successfully"));

    const port =
      typeof config.port === "number" ? config.port : parseInt(config.port!);
    //app listening here
    app.listen(port, config.ip_address as string, () => {
      console.log(colors.bold.yellow(`🚀 Application Running on port:${port}`));
    });
  } catch (error) {
    console.error(error);
  }
}

main();
