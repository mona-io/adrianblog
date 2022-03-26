import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  localizedMsgKey?: string | undefined = CoreLocaleEnum.ERROR_DBCONNECTION_MSG;

  constructor() {
    super("Error connecting to database");
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Error connecting to database" }];
  }
}
