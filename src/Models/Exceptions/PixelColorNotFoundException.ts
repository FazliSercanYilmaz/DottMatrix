import { ExceptionCodes } from "../Enums/ExceptionCodes";
import { ExceptionMessages } from "../Enums/ExceptionMessages";
import { Exception } from "./Exception";

export class PixelColorNotFoundException extends Exception {
  constructor() {
    super(
      ExceptionCodes.PIXEL_COLOR_NOT_FOUND,
      ExceptionMessages.PIXEL_COLOR_NOT_FOUND
    );
  }
}
