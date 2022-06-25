import { ExceptionCodes } from "../../Enums/ExceptionCodes";
import { ExceptionMessages } from "../../Enums/ExceptionMessages";
import { Exception } from "../Exception";

export class ValueIsWrongException extends Exception {
  constructor(detail: string = null) {
    super(
      ExceptionCodes.VALUE_IS_WRONG,
      ExceptionMessages.VALUE_IS_WRONG,
      detail
    );
  }
}
