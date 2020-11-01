import querystring from "querystring";
import debug from "debug";
import nonce from "nonce";

import { OAuthStartOptions } from "./types";
import getCookieOptions from "./cookie-options";

const createNonce = nonce();

const log = debug("server.oAuthQueryString");

export default function oAuthQueryString(
  req,
  res,
  options: OAuthStartOptions,
  callbackPath: string
) {
  const { hostname, cookies } = req;
  const { scopes = [], apiKey } = options;

  const requestNonce = createNonce();

  log("setting appNonce", requestNonce);

  res.cookie("appNonce", requestNonce, getCookieOptions(req));

  /* eslint-disable @typescript-eslint/camelcase */
  const redirectParams = {
    state: requestNonce,
    scope: scopes.join(", "),
    client_id: apiKey,
    redirect_uri: `https://${hostname}${callbackPath}`,
  };
  /* eslint-enable @typescript-eslint/camelcase */

  return querystring.stringify(redirectParams);
}
