import { Matrix } from "./Matrix";
import { PixelColor } from "../Enums/PixelColor";

export class PixelMatrix extends Matrix<PixelColor> {
  constructor(rowLength: number, columnLength: number) {
    super(rowLength, columnLength);
    this.data = new Array<Array<PixelColor>>();
  }
}
