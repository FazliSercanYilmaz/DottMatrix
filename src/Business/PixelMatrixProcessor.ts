import { IMatrixProcessor } from "./IMatrixProcessor";
import { PixelColor } from "../Models/Enums/PixelColor";
import { PixelMatrix } from "../Models/Domains/PixelMatrix";
import { ColumnOutOfRangeException } from "../Models/Exceptions/Matrix/ColumnOutOfRangeException";
import * as Joi from "joi";
import { ValueIsWrongException } from "../Models/Exceptions/Matrix/ValueIsWrongException";

export class PixelMatrixProcessor
  implements IMatrixProcessor<string, PixelMatrix>
{
  createMatrix(
    id: number,
    rowLength: number,
    columnLength: number
  ): PixelMatrix {
    return new PixelMatrix(id, rowLength, columnLength);
  }
  insertRowToMatrix(rowData: string, matrix: PixelMatrix) {
    if (rowData.length != matrix.columnLength) {
      throw new ColumnOutOfRangeException();
    }
    const rowNumber = matrix.insertRow([]);

    for (let index = 0; index < rowData.length; index++) {
      const value = this.validatePixelColor(rowData[index]);

      matrix.setValue({ x: rowNumber, y: index }, value);
    }
  }

  private validatePixelColor(data: string): PixelColor {
    const { error, value } = Joi.number()
      .required()
      .valid(PixelColor.BLACK, PixelColor.WHITE)
      .validate(data, { convert: true });

    if (error) {
      throw new ValueIsWrongException(error.message);
    }

    return value;
  }

  matrixToData(matrix: PixelMatrix): string {
    let result = "";
    for (let x = 0; x < matrix.rowLength; x++) {
      for (let y = 0; y < matrix.columnLength; y++) {
        result += matrix.getValue({ x, y }).toString();
      }
      if (x !== matrix.rowLength - 1) {
        result += "\n";
      }
    }
    return result;
  }
}
