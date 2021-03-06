import { NextFunction, Request, Response } from "express";
import { CustomError } from "infrastructure/errors/custom-error";
import { RequestValidationError } from "infrastructure/errors/request-validation-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { logger } from "services/winston-logger/logger.service";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const errors = err.serializeErrors();
    const localizedMessageKey = err.localizedMsgKey
      ? err.localizedMsgKey
      : err.message;

    if (!(err instanceof RequestValidationError)) {
      errors.forEach(
        (e) => (e.message = req.t ? req.t(localizedMessageKey) : e.message)
      );
    }
    if (err instanceof RequestValidationError) {
      errors.forEach((e) => (e.message = req.t ? req.t(e.message) : e.message));
    }

    res.status(err.statusCode).send({ errors });
    // Winston Logger
    logger.error(
      err.message,
      logSerializer(req, res, localizedMessageKey, {}, err.statusCode)
    );
    return;
  }

  console.error(err);
  res.status(400).send({
    errors: [
      {
        message: req.t
          ? req.t(CoreLocaleEnum.ERROR_400_MSG)
          : "Something went wrong",
      },
    ],
  });
  logger.error(
    err.message,
    logSerializer(req, res, CoreLocaleEnum.ERROR_400_MSG, {}, 400)
  );
  return;
};
