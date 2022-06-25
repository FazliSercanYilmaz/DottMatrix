import { IMatrixProcessor } from "./IMatrixProcessor";
import { ResultMatrix } from "../Models/Domains/ResultMatrix";
import { ColumnOutOfRangeException } from "../Models/Exceptions/Matrix/ColumnOutOfRangeException";
import * as Joi from "joi";
import { ValueIsWrongException } from "../Models/Exceptions/Matrix/ValueIsWrongException";

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
      const value = this.validateValue(rowData[index]);

      matrix.setValue({ x: rowNumber, y: index }, value);
    }
  }

  private validateValue(data: any) {
    const { error, value } = Joi.number()
      .integer()
      .required()
      .validate(data, { convert: true });

    if (error) {
      throw new ValueIsWrongException(error.message);
    }

    return value;
  }

  matrixToData(matrix: ResultMatrix): string {
    let result = "";

    for (let x = 0; x < matrix.rowLength; x++) {
      for (let y = 0; y < matrix.columnLength; y++) {
        const value = matrix.getValue({ x, y })?.toString();
        if (value) {
          result += value;
        }

        if (y !== matrix.columnLength - 1) {
          result += " ";
        }
      }

      if (x !== matrix.rowLength - 1) {
        result += "\n";
      }
    }
    return result;
  }
}
