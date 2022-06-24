import { Location } from "./Location";

abstract class Matrix<T> {
  rowLength: number;
  columnLength: number;
  data: Array<Array<T>>;
  getValue(location: Location): T {
    //TODO index control
    return this.data?.[location.x]?.[location.y];
  }

  setValue(location: Location, value: T): void {
    //TODO index control
    this.data[location.x][location.y] = value;
  }
}
