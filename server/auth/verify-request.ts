import { compose } from "compose-middleware";
import debug from "debug";
import { loginAgainIfDifferentAccount } from "./login-again-if-different-account";
import { verifyToken } from "./verify-token";
import { Options, Routes } from "./types";

const log = debug("server.auth.verifyRequest");

export default function verifyRequest(givenOptions: Options = {}) {
  const routes: Routes = {
    authRoute: "/auth",
    fallbackRoute: "/auth",
    ...givenOptions,
  };

  log("verifying request");

  // FIXME: Fix the typescript error
  //@ts-ignore
  return compose([loginAgainIfDifferentAccount(routes), verifyToken(routes)]);
}
