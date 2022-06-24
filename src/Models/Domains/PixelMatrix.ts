import { Matrix } from "./Matrix";
import { PixelColor } from "../Enums/PixelColor";

export class PixelMatrix extends Matrix<PixelColor> {
  constructor(rowLength: number, columnLength: number) {
    super(rowLength, columnLength);
    this.data = new Array<Array<PixelColor>>();
  }
  insertRow(rowData: Array<PixelColor>): number {
    if (this.data.length >= this.rowLength) {
      throw new Error("todo");
    }

    this.data.push(rowData);
    return this.data.length - 1;
  }
}
