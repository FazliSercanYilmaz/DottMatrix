import { RowOutOfRangeException } from "../Exceptions/RowOutOfRangeException";
import { Matrix } from "./Matrix";

export class ResultMatrix extends Matrix<number> {
  constructor(rowLength: number, columnLength: number) {
    super(rowLength, columnLength);
    this.data = new Array<Array<number>>();
  }
}
