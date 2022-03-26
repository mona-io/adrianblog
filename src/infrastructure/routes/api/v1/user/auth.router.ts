import { authSigninController } from "controllers/user-controllers/api/v1/auth/sign-in.controller";
import { authSignupController } from "controllers/user-controllers/api/v1/auth/sign-up.controller";
import { signinSchema } from "controllers/user-controllers/api/v1/auth/validation-schemas/sign-in.schema";
import { signupSchema } from "controllers/user-controllers/api/v1/auth/validation-schemas/sign-up.schema";
import express from "express";
import { asyncHandler } from "infrastructure/middleware/async-handler.middleware";
import { validateRequest } from "infrastructure/middleware/validation-request.middleware";

export const authRouter = express.Router();

// POST: Sign-up
authRouter.post(
  "/sign-up",
  signupSchema,
  validateRequest,
  asyncHandler(authSignupController)
);

// POST: Sign-in
authRouter.post(
  "/sign-in",
  signinSchema,
  validateRequest,
  asyncHandler(authSigninController)
);
