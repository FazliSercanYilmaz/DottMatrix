import { ExceptionCodes } from "../../Enums/ExceptionCodes";
import { ExceptionMessages } from "../../Enums/ExceptionMessages";
import { Exception } from "../Exception";

export class ConfigIsWrongException extends Exception {
  constructor(detail: string) {
    super(
      ExceptionCodes.CONFIG_IS_WRONG,
      ExceptionMessages.CONFIG_IS_WRONG,
      detail
    );
  }
}
