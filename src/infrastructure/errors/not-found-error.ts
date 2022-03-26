import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  localizedMsgKey?: string | undefined = CoreLocaleEnum.ERROR_404_MSG;

  constructor() {
    super("Not Found");
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not Found" }];
  }
}
