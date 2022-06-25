import { IMatrixProcessor } from "./IMatrixProcessor";
import { PixelColor } from "../Models/Enums/PixelColor";
import { PixelMatrix } from "../Models/Domains/PixelMatrix";
import { ColumnOutOfRangeException } from "src/Models/Exceptions/ColumnOutOfRangeException";
import { PixelColorNotFoundException } from "src/Models/Exceptions/PixelColorNotFoundException";

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
      const pixelColor = Number.parseInt(rowData[index]);

      if (pixelColor !== PixelColor.BLACK && pixelColor !== PixelColor.WHITE) {
        throw new PixelColorNotFoundException();
      }

      matrix.setValue({ x: rowNumber, y: index }, pixelColor);
    }
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
