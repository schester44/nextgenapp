import express from "express";
import Debug from "debug";
import cors from "cors";
import next from "next";
import session from "express-session";
import cookieParser from "cookie-parser";

import appAuth, { verifyRequest } from "./auth";

const log = Debug("server");

const dev = process.env.NODE_ENV !== "production";
const PORT = parseInt(process.env.PORT || "3002", 10);

const app = next({ dev });
const handle = app.getRequestHandler();

log("Starting server on", PORT);

app.prepare().then(() => {
  log("App prepared");

  const server = express();

  server.use(cors());
  server.use(cookieParser());

  server.set("trust proxy", true);

  server.use(
    session({
      name: "app_sess",
      secret: "SUPER-SECRET-123",
      saveUninitialized: false,
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
      apiKey: process.env.APP_API_KEY,
      secret: process.env.APP_API_SECRET,
      // scopes to request on the company's account
      scopes: ["read_devices", "write_campaigns"],
      // callback for when auth is completed
      afterAuth(req, res) {
        const { account, accessToken } = req.session;

        log("Authenticated", accessToken, req.session);

        res.redirect(`/?account=${account}`);
      },
    })
  );

  // FIXME:
  //@ts-ignore
  server.use(verifyRequest());

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    log(`Server ready on http://localhost:${PORT}`);
  });
});
