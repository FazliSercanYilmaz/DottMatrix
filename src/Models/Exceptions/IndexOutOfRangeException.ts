import { ExceptionCodes } from "../Enums/ExceptionCodes";
import { ExceptionMessages } from "../Enums/ExceptionMessages";
import { Exception } from "./Exception";

export class IndexOutOfRangeException extends Exception {
  constructor() {
    super(
      ExceptionCodes.INDEX_OUT_OF_RANGE,
      ExceptionMessages.INDEX_OUT_OF_RANGE
    );
  }
}
