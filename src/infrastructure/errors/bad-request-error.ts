import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor( message: string, public localizedMsgKey?: string) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
