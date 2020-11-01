import { Request, Response, NextFunction } from "express";
import debug from "debug";
import { TEST_COOKIE_NAME, TOP_LEVEL_OAUTH_COOKIE_NAME } from "./index";
import fetch from "node-fetch";

import { Routes } from "./types";
import { redirectToAuth } from "./utils";

const log = debug("server.auth.verifyTokenMiddleware");

export function verifyToken(routes: Routes) {
  return async function verifyTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { session } = req;

    log(session);

    if (session && session.accessToken) {
      res.cookie(TOP_LEVEL_OAUTH_COOKIE_NAME, "1");

      // If a user has installed the app previously in their account, the accessToken can be stored in session.
      // we need to check if the accessToken is valid, and the only way to do this is by hitting the api.
      const response = await fetch(
        //FIXME: :3446 is there for dev purposes and would need replaced
        // FIXME: use https://
        `http://${session.account}:3446/v1/api/company`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      log(response.status);

      if (response.status === 403) {
        return redirectToAuth(routes, req, res);
      }

      await next();
      return;
    }

    res.cookie(TEST_COOKIE_NAME, "1");

    log("redirecting to auth");

    redirectToAuth(routes, req, res);
  };
}
