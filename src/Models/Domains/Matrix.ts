import { IndexOutOfRangeException } from "../Exceptions/IndexOutOfRangeException";
import { Location } from "./Location";

export abstract class Matrix<T> {
  protected data: Array<Array<T>>;

  protected constructor(
    public readonly rowLength: number,
    public readonly columnLength: number
  ) {}

  getValue(location: Location): T {
    this.checkLocation(location);

    return this.data?.[location.x]?.[location.y];
  }

  setValue(location: Location, value: T): void {
    this.checkLocation(location);

    this.data[location.x][location.y] = value;
  }

  private checkLocation(location: Location): void {
    const isLocationOutOfRange =
      location.x >= this.rowLength ||
      location.y >= this.columnLength ||
      location.x < 0 ||
      location.y < 0;

    if (isLocationOutOfRange) {
      throw new IndexOutOfRangeException();
    }
  }
}