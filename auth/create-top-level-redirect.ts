import querystring from "querystring";

import { Request, Response, NextFunction } from "express";

import redirectionPage from "./redirection-page";

export default function createTopLevelRedirect(apiKey: string, path: string) {
  return function topLevelRedirect(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { hostname, query } = req;
    const { account } = query;

    // FIXME: why do I need to type `as string`
    const queryString = querystring.stringify({ account: account as string });

    res.send(
      redirectionPage({
        origin: account,
        // FIXME: Change to https
        redirectTo: `http://${hostname}${path}?${queryString}`,
        apiKey,
      })
    );
  };
}
