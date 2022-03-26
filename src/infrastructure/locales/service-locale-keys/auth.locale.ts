export enum AuthLocaleEnum {
  INFO_SIGNUP = "info.auth.signup.successMsg",
  INFO_SIGNIN = "info.auth.signin.successMsg",
  INFO_SIGNOUT = "info.auth.signout.successMsg",
  INFO_AVATAR_CHANGED = "info.auth.avatarChanged.successMsg",
  INFO_ADMIN_USER_DELETE ="info.auth.admin.userDeleted",
  INFO_ADMIN_USER_CLAIMS_MODIFIED ='info.auth.admin.userClaimsModified',
  

  ERROR_EMAIL_IN_USE = "errors.auth.registerService.emailInUse",
  ERROR_BADREQ_PASS_MISMATCH = "errors.auth.authenticateService.passMatchErr",
  ERROR_INVALID_REFRESHTOKEN = "errors.auth.getRefreshTokenService.invalidRefreshToken",
  ERROR_USER_IS_SUSPENDED = "errors.auth.userIsSuspended",

  ERROR_SCHEMA_SIGNIN_EMAIL = "errors.auth.signinSchema.email",
  ERROR_SCHEMA_SIGNIN_PASSWORD = "errors.auth.signinSchema.password",

  ERROR_SCHEMA_SIGNUP_FIRSTNAME = "errors.auth.signupSchema.firstName",
  ERROR_SCHEMA_SIGNUP_LASTNAME = "errors.auth.signupSchema.lastName",
  ERROR_SCHEMA_SIGNUP_EMAIL = "errors.auth.signupSchema.email",
  ERROR_SCHEMA_SIGNUP_PASSWORD_MAX_LENGTH = "errors.auth.signupSchema.passwordLength",
  ERROR_SCHEMA_WEAK_PASSWORD = "errors.auth.signupSchema.passwordTooWeak",
  ERROR_SCHEMA_STRONG_PASSWORD = "errors.auth.signupSchema.passwordDifficulty",
}
