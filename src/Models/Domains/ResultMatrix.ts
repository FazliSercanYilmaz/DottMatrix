import { Matrix } from "./Matrix";

export class ResultMatrix extends Matrix<number> {
  constructor(id: number, rowLength: number, columnLength: number) {
    super(id, rowLength, columnLength);
    this.data = new Array<Array<number>>();
  }
}
