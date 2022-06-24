import { Location } from "./Location";

export abstract class Matrix<T> {
  constructor(
    private rowLength: number,
    private columnLength: number,
    private data: Array<Array<T>>
  ) {}

  getValue(location: Location): T {
    //TODO index control
    return this.data?.[location.x]?.[location.y];
  }

  setValue(location: Location, value: T): void {
    //TODO index control
    this.data[location.x][location.y] = value;
  }
}
