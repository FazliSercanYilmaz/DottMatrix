import { Matrix } from "./Matrix";
import { PixelColor } from "../Enums/PixelColor";

export class PixelMatrix extends Matrix<PixelColor> {
  constructor(id: number, rowLength: number, columnLength: number) {
    super(id, rowLength, columnLength);
    this.data = new Array<Array<PixelColor>>();
  }
}
