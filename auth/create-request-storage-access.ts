import { Request, Response, NextFunction } from "express";

import { OAuthStartOptions } from "./types";

import { AuthError } from "./errors";
import Errors from "./errors";

const HEADING = "This app needs access to your browser data";
const BODY =
  "Your browser is blocking this app from accessing your data. To continue using this app, click Continue, then click Allow if the browser prompts you.";
const ACTION = "Continue";

export default function createRequestStorageAccess({
  apiKey,
  prefix,
}: OAuthStartOptions) {
  return function requestStorage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { query } = req;
    const { account } = query;

    console.log({ query });
    if (account == null) {
      return next(new AuthError(Errors.AccountParamMissing, 400));
    }

    res.send({
      HEADING,
      BODY,
      ACTION,
    });
  };
}
