import { Location } from "../Models/Domains/Location";
import { Matrix } from "../Models/Domains/Matrix";
import { IFinder } from "./IFinder";
import { IMatrixProcessor } from "./IMatrixProcessor";

export class Finder<T> implements IFinder<T> {
  constructor(
    private readonly resultMatrixProcessor: IMatrixProcessor<
      Array<number>,
      Matrix<number>
    >
  ) {}
  findDistanceMatrix(matrix: Matrix<T>, targetValue: T): Matrix<number> {
    const distanceMatrix = this.resultMatrixProcessor.createMatrix(
      matrix.rowLength,
      matrix.columnLength
    );

    for (let x = 0; x < matrix.rowLength; x++) {
      const rowTemp = [];
      for (let y = 0; y < matrix.columnLength; y++) {
        rowTemp.push(this.findNearestDistance({ x, y }, matrix, targetValue));
      }

      this.resultMatrixProcessor.insertRowToMatrix(rowTemp, distanceMatrix);
    }

    return distanceMatrix;
  }

  findNearestDistance(
    location: Location,
    matrix: Matrix<T>,
    targetValue: T
  ): number {
    if (matrix.getValue(location) === targetValue) {
      return 0;
    }

    let distance = Number.MAX_SAFE_INTEGER;

    for (let x = 0; x < matrix.rowLength; x++) {
      for (let y = 0; y < matrix.columnLength; y++) {
        const value = matrix.getValue({ x, y });
        if (value === targetValue) {
          const tempDistance = this.calculateDistance(location, { x, y });

          distance = tempDistance < distance ? tempDistance : distance;
        }
      }
    }

    return distance;
  }

  private calculateDistance(source: Location, target: Location) {
    return Math.abs(source.x - target.x) + Math.abs(source.y - target.y);
  }
}
