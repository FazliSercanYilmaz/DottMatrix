import { IMatrixProcessor } from "./IMatrixProcessor";
import { PixelColor } from "../Models/Enums/PixelColor";
import { PixelMatrix } from "../Models/Domains/PixelMatrix";
import { ColumnOutOfRangeException } from "../Models/Exceptions/ColumnOutOfRangeException";
import * as Joi from "joi";
import { PixelColorNotFoundException } from "../Models/Exceptions/PixelColorNotFoundException";

export class PixelMatrixProcessor
  implements IMatrixProcessor<string, PixelMatrix>
{
  createMatrix(rowLength: number, columnLength: number): PixelMatrix {
    return new PixelMatrix(rowLength, columnLength);
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

  private validatePixelColor(data: any): PixelColor {
    const { error, value } = Joi.number()
      .valid(PixelColor.BLACK, PixelColor.WHITE)
      .validate(data, { convert: true });

    if (error) {
      throw new PixelColorNotFoundException();
    }

    return value;
  }

  matrixToData(matrix: PixelMatrix): string {
    let result = "";
    for (let x = 0; x < matrix.rowLength; x++) {
      for (let y = 0; y < matrix.columnLength; y++) {
        result += matrix.getValue({ x, y }).toString();
      }
      result += "\n";
    }
    return result;
  }
}
