import express from "express";
import { i18nextConfiguration } from "infrastructure/locales/i18next-config";
import i18next from "i18next";
import i18middleware from "i18next-http-middleware";
import { errorHandler } from "infrastructure/middleware/error-handler.middleware";
import cookieParser from "cookie-parser";
import { authRouter } from "infrastructure/routes/api/v1/user/auth.router";
import { currentUser } from "infrastructure/middleware/current-user.middleware";
import { adminActivityRouter } from "infrastructure/routes/api/v1/admin/activity.router";
import { adminAuthRouter } from "infrastructure/routes/api/v1/admin/auth.router";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import responseTime from "response-time";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use( responseTime() );
i18nextConfiguration();
app.use(i18middleware.handle(i18next));

// Assign current user to Express Request object
app.use(currentUser);

// Routes
app.use("/:lng?/api/v1/users", authRouter);

app.use("/:lng?/api/v1/admin/activities", adminActivityRouter);
app.use("/:lng?/api/v1/admin/users", adminAuthRouter);

// Issue 404 Not Found Error if all paths until this point do not match
app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);
export { app };
  

