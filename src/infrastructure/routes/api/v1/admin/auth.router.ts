import express from 'express'
import { adminAuthEditUserClaimsController } from "controllers/admin-controllers/api/v1/auth/edit-user-claims.controller";
import { asyncHandler } from "infrastructure/middleware/async-handler.middleware";
import { authorize } from "infrastructure/middleware/authorize.middleware";
import { requireAuth } from "infrastructure/middleware/require-auth.middleware";
import { AccessPoliciesEnum } from "infrastructure/security/access-policies.enum";


export const adminAuthRouter = express.Router();

//PUT: Change user claims
adminAuthRouter.put(
  "/set-claims/:id",
  requireAuth,
  authorize([
    AccessPoliciesEnum.Auth_SetUserClaims,
    AccessPoliciesEnum.Core_ADMIN,
  ]),
  asyncHandler(adminAuthEditUserClaimsController)
);
