import { ExceptionCodes } from "../Enums/ExceptionCodes";
import { ExceptionMessages } from "../Enums/ExceptionMessages";
import { Exception } from "./Exception";

export class ColumnOutOfRangeException extends Exception {
  constructor() {
    super(
      ExceptionCodes.COLOMN_OUT_OF_RANGE,
      ExceptionMessages.COLOMN_OUT_OF_RANGE
    );
  }
}
