import { compose } from "compose-middleware";
import debug from "debug";
import { loginAgainIfDifferentAccount } from "./login-again-if-different-account";
import { verifyToken } from "./verify-token";
import { Options, Routes } from "./types";

const log = debug("server.auth");

export default function verifyRequest(givenOptions: Options = {}) {
  const routes: Routes = {
    authRoute: "/auth",
    fallbackRoute: "/auth",
    ...givenOptions,
  };

  log("verifyRequestMiddleware");

  return compose([loginAgainIfDifferentAccount(routes), verifyToken(routes)]);
}
