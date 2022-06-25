import { Matrix } from "./Matrix";
import { PixelColor } from "../Enums/PixelColor";
import { RowOutOfRangeException } from "../Exceptions/RowOutOfRangeException";

export class PixelMatrix extends Matrix<PixelColor> {
  constructor(rowLength: number, columnLength: number) {
    super(rowLength, columnLength);
    this.data = new Array<Array<PixelColor>>();
  }
}
