require("dotenv").config();

import express, { Request, Response } from "express";
import Debug from "debug";
import cors from "cors";
import next from "next";
import session from "express-session";
import cookieParser from "cookie-parser";
import connectRedis from "connect-redis";
import appAuth, { verifyRequest } from "express-app-auth";

import { createRedis } from "./redis";

const log = Debug("server");

const dev = process.env.NODE_ENV !== "production";
const PORT = parseInt(process.env.PORT || "3002", 10);

const app = next({ dev });
const handle = app.getRequestHandler();

log("Preparing app on %o", PORT);

app.prepare().then(() => {
  log("App prepared");

  const server = express();

  server.use(cors());
  server.use(cookieParser());

  server.set("trust proxy", true);

  const RedisStore = connectRedis(session);

  server.use(
    session({
      name: "app_sess",
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      store: new RedisStore({ client: createRedis() }),
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  server.use(
    appAuth({
      apiKey: process.env.APP_API_KEY as string,
      secret: process.env.APP_API_SECRET as string,
      // scopes to request on the company's account
      scopes: ["read_devices", "write_campaigns"],
      // callback for when auth is completed
      afterAuth(req: Request, res: Response) {
        const { account } = req.session as Express.Session;

        log("Authenticated");

        res.redirect(`/?account=${account}`);
      },
    })
  );

  server.use(verifyRequest());

  server.use((req, res) => handle(req, res));

  server.listen(PORT, () => {
    log(`Server ready on http://localhost:${PORT}`);
  });
});
