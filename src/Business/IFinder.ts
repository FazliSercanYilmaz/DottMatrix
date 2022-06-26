import { Matrix } from "../Models/Domains/Matrix";

export interface IFinder<T> {
  findDistanceMatrix(matrix: Matrix<T>, targetValue: T): Matrix<number>;
}
