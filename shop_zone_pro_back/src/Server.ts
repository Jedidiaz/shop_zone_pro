import fs from 'node:fs';
import {
  Server as ServerHttp,
  createServer as createServerHttp,
} from "node:http";
import {
  Server as ServerHttps,
  createServer as createServerHttps,
} from "node:https";

import express, { Application } from "express";
import Config from "./Config";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";
import { FilesController } from "./utils";
import generateKeys from "./utils/KeyFiles";
import { RESTPATHS } from "./routes";

class Server {
  private app: Application;
  private port: string | number;
  private server: ServerHttp | ServerHttps;

  constructor() {
    this.app = express();
    this.port = Config.port;

    this.middleware();
    this.routes();
    // this.dbConnection();

    this.server = Config.dev
      ? createServerHttp(this.app)
      : createServerHttps(this.app);
  }

  private middleware() {
    // CORS
    this.app.use(
      cors({
        origin: ["http://localhost:4030"],
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );

    // Lectura y parseo del body
    this.app.use(express.json());
    this.app.use(
      bodyParser.json({
        limit: "10mb",
      })
    );
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(compression());
    //morgan logs 
    this.app.use(morgan("dev"));
    // keysFiles
    generateKeys();

    // folder private config
    FilesController.existFolder();
  }

  private routes() {
    RESTPATHS.forEach(({ url, router }) =>
      this.app.use(`/api/${url}`, require(`./router/${router}`))
    );

    this.app.get("/", async (_, res) => {
      const html = await new Promise((resolve, reject) =>
        fs.readFile(`public/index.html`, { encoding: "utf-8" }, (err, html) => {
          if (err) {
            return reject(err);
          }
          return resolve(html);
        })
      );
      res.send(html);
    });

    this.app.use("*", express.static("public/"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`HTTPS Server running on port ${this.port}`);
    });
  }
}

export default Server;
