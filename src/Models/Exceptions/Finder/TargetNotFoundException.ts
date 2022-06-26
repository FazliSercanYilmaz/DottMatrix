import { ExceptionCodes } from "../../Enums/ExceptionCodes";
import { ExceptionMessages } from "../../Enums/ExceptionMessages";
import { Exception } from "../Exception";

export class TargetNotFoundException extends Exception {
  constructor() {
    super(ExceptionCodes.TARGET_NOT_FOUND, ExceptionMessages.TARGET_NOT_FOUND);
  }
}
