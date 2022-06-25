import { ExceptionCodes } from "../../Enums/ExceptionCodes";
import { ExceptionMessages } from "../../Enums/ExceptionMessages";
import { Exception } from "../Exception";

export class RowOutOfRangeException extends Exception {
  constructor() {
    super(ExceptionCodes.ROW_OUT_OF_RANGE, ExceptionMessages.ROW_OUT_OF_RANGE);
  }
}
