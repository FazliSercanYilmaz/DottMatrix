import { IMatrixProcessor } from "./IMatrixProcessor";
import { ResultMatrix } from "../Models/Domains/ResultMatrix";
import { ColumnOutOfRangeException } from "src/Models/Exceptions/ColumnOutOfRangeException";

export class ResultMatrixProcessor
  implements IMatrixProcessor<string | Array<number>, ResultMatrix>
{
  createMatrix(rowLength: number, columnLength: number): ResultMatrix {
    return new ResultMatrix(rowLength, columnLength);
  }
  insertRowToMatrix(rowData: Array<number>, matrix: ResultMatrix) {
    if (rowData.length != matrix.columnLength) {
      throw new ColumnOutOfRangeException();
    }
    const rowNumber = matrix.insertRow([]);

    for (let index = 0; index < rowData.length; index++) {
      const value = rowData[index];

      matrix.setValue({ x: rowNumber, y: index }, value);
    }
  }

  matrixToData(matrix: ResultMatrix): string {
    let result = "";
    for (let x = 0; x < matrix.rowLength; x++) {
      for (let y = 0; y < matrix.columnLength; y++) {
        result += matrix.getValue({ x, y }).toString();

        if (y !== matrix.columnLength - 1) {
          result += " ";
        }
      }
      result += "\n";
    }
    return result;
  }
}
