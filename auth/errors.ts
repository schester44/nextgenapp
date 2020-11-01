enum Errors {
  AccountParamMissing = "Expected a valid account query parameter",
  InvalidHmac = "HMAC validation failed",
  AccessTokenFetchFailure = "Could not fetch access token",
  NonceMatchFailed = "Request origin could not be verified",
}

export default Errors;

export class AuthError extends Error {
  public code: string;

  constructor(message, code) {
    super();

    this.code = code;
    this.message = message;
    this.name = "AuthError";
  }
}
