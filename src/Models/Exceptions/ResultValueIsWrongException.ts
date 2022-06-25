import { ExceptionCodes } from "../Enums/ExceptionCodes";
import { ExceptionMessages } from "../Enums/ExceptionMessages";
import { Exception } from "./Exception";

export class ResultValueIsWrongException extends Exception {
  constructor() {
    super(
      ExceptionCodes.RESULT_VALUE_IS_WRONG,
      ExceptionMessages.RESULT_VALUE_IS_WRONG
    );
  }
}
