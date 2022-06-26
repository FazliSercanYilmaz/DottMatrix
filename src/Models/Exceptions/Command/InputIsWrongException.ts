import { ExceptionCodes } from "../../Enums/ExceptionCodes";
import { ExceptionMessages } from "../../Enums/ExceptionMessages";
import { Exception } from "../Exception";

export class InputIsWrongException extends Exception {
  constructor(detail: string) {
    super(
      ExceptionCodes.INPUT_IS_WRONG,
      ExceptionMessages.INPUT_IS_WRONG,
      detail
    );
  }
}
