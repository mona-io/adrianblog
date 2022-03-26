import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { CustomError } from "./custom-error";

export class NotAuthenticatedError extends CustomError {
  statusCode: number = 401;
  localizedMsgKey?: string | undefined = CoreLocaleEnum.ERROR_401_MSG;

  constructor() {
    super("Not Authenticated");
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not Authenticated" }];
  }
}
