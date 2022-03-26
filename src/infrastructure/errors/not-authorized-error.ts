import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 403;
  localizedMsgKey = CoreLocaleEnum.ERROR_403_MSG;

  constructor() {
    super("Not Authorized");
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not Authorized" }];
  }
}
