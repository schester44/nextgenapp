import { Routes } from "./types";
import { Request, Response } from "express";

export function clearSession(req: Request) {
  delete req.session.account;
  delete req.session.accessToken;
}

export function redirectToAuth(
  { fallbackRoute, authRoute }: Routes,
  req: Request,
  res: Response
) {
  const { account } = req.query;

  const routeForRedirect =
    account == null ? fallbackRoute : `${authRoute}?account=${account}`;

  res.redirect(routeForRedirect);
}
