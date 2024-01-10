import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import { PORT, NODE_ENV } from "@config";
import { WinstonLogger } from "@utils";
import morgan from "morgan";
import { ResponseError } from "@interfaces";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

NODE_ENV === "development" && app.use(morgan("dev"));

if (NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(
  (
    err: ResponseError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    WinstonLogger.error(err.message);
    res.status(err.status || 500);
    res.json({
      status: err.status || 500,
      code: err.code || err.status || 500,
      message: err.message || "Ooops, Something went wrong on our end!",
    });
  }
);

app
  .listen(PORT, () =>
    WinstonLogger.info(`
      #######################################################
      🛡️ Server running in "${NODE_ENV}" mode on PORT: ${PORT} 🛡️
      #######################################################
    `)
  )
  .on("error", (e) => {
    WinstonLogger.info(e.message);
    process.exitCode = 1;
  });
