import * as Joi from "joi";
import { IndexOutOfRangeException } from "../Exceptions/Matrix/IndexOutOfRangeException";
import { RowOutOfRangeException } from "../Exceptions/Matrix/RowOutOfRangeException";
import { Location } from "./Location";

export abstract class Matrix<T> {
  protected data: Array<Array<T>>;

  protected constructor(
    public readonly id: number,
    public readonly rowLength: number,
    public readonly columnLength: number
  ) {}

  getValue(location: Location): T {
    this.checkLocation(location);

    return this.data[location.x][location.y];
  }

  setValue(location: Location, value: T): void {
    this.checkLocation(location);

    this.data[location.x][location.y] = value;
  }

  private checkLocation(location: Location): void {
    //todo joi

    const { error: rowError } = Joi.number()
      .required()
      .min(0)
      .max(this.rowLength - 1)
      .validate(location.x);

    const { error: colError } = Joi.number()
      .required()
      .min(0)
      .max(this.columnLength - 1)
      .validate(location.y);

    const isLocationOutOfRange = colError || rowError;

    if (isLocationOutOfRange) {
      throw new IndexOutOfRangeException();
    }
  }

  insertRow(rowData: Array<T>): number {
    if (this.data.length >= this.rowLength) {
      throw new RowOutOfRangeException();
    }

    this.data.push(rowData);
    return this.data.length - 1;
  }
}
