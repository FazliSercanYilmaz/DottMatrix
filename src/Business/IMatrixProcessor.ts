import { Matrix } from "../Models/Domains/Matrix";

export interface IMatrixProcessor<T, Y extends Matrix<any>> {
  createMatrix(id: number, rowLength: number, columnLength: number): Y;
  insertRowToMatrix(rowData: T, matrix: Y);
  matrixToData(matrix: Y): T;
}
