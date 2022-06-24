import { IMatrixProcessor } from "./IMatrixProcessor";
import { PixelColor } from "../Models/Enums/PixelColor";
import { PixelMatrix } from "../Models/Domains/PixelMatrix";

export class PixelMatrixProcessor
  implements IMatrixProcessor<string, PixelMatrix>
{
  createMatrix(rowLength: number, columnLength: number): PixelMatrix {
    return new PixelMatrix(rowLength, columnLength);
  }
  insertRowToMatrix(rowData: string, matrix: PixelMatrix) {
    if (rowData.length != matrix.columnLength) {
      //TODO new Error
      throw new Error("todo");
    }
    const rowNumber = matrix.insertRow([]);

    for (let index = 0; index < rowData.length; index++) {
      const pixelColor = Number.parseInt(rowData[index]);

      if (pixelColor !== PixelColor.BLACK && pixelColor !== PixelColor.WHITE) {
        throw new Error("todo");
      }

      matrix.setValue({ x: rowNumber, y: index }, pixelColor);
    }
  }

  matrixToData(matrix: PixelMatrix): string {
    return " ";
  }
}
