import { Location } from "../Models/Domains/Location";
import { Matrix } from "../Models/Domains/Matrix";

export interface IFinder<T> {
  findNearestDistance(
    location: Location,
    matrix: Matrix<T>,
    targetValue: T
  ): number;
}
