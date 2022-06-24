import { Matrix } from "./Matrix";

export class ResultMatrix extends Matrix<number> {
  constructor(rowLength: number, columnLength: number) {
    super(rowLength, columnLength);
    this.data = new Array<Array<number>>();
  }
  insertRow(rowData: Array<number>): number {
    if (this.data.length >= this.rowLength) {
      throw new Error("todo");
    }

    this.data.push(rowData);
    return this.data.length - 1;
  }
}
