import { Request, Response, NextFunction } from "express";

import { Routes } from "./types";
import { clearSession, redirectToAuth } from "./utils";
import debug from "debug";

const log = debug("server.auth.loginAgainIfDifferentAccount");

export function loginAgainIfDifferentAccount(routes: Routes) {
  return async function loginAgainIfDifferentAccountMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { query, session } = req;

    log(query, session);

    if (session && query.account && session.account !== query.account) {
      clearSession(req);
      redirectToAuth(routes, req, res);
      return;
    }

    await next();
  };
}
