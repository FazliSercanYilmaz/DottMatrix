import { IndexOutOfRangeException } from "../../../Models/Exceptions/Matrix/IndexOutOfRangeException";
import { Matrix } from "../../../Models/Domains/Matrix";
import { RowOutOfRangeException } from "../../../Models/Exceptions/Matrix/RowOutOfRangeException";

export class TestMatrix extends Matrix<number> {
  constructor(rowLength: number, columnLength: number) {
    super(1, rowLength, columnLength);
    this.data = new Array<Array<number>>();
  }
}

describe("Matrix test", () => {
  it("should set value to matrix succecsfully", () => {
    //given
    const rowLength = 5;
    const columnLength = 5;
    const testMatrix = new TestMatrix(rowLength, columnLength);

    //when
    testMatrix.insertRow([]);
    testMatrix.setValue({ x: 0, y: 0 }, 5);

    //then
    expect((testMatrix as any).data[0][0]).toBe(5);
  });

  it("should throw exception on set value when location is wrong", () => {
    //given
    const rowLength = 5;
    const columnLength = 5;
    const testMatrix = new TestMatrix(rowLength, columnLength);

    //when
    testMatrix.insertRow([]);

    //then
    expect(() => testMatrix.setValue({ x: 6, y: -6 }, 5)).toThrow(
      IndexOutOfRangeException
    );
  });

  it("should get value from matrix succecsfully", () => {
    //given
    const rowLength = 5;
    const columnLength = 5;
    const testMatrix = new TestMatrix(rowLength, columnLength);

    //when
    testMatrix.insertRow([]);
    (testMatrix as any).data[0][1] = 20;

    //then
    expect(testMatrix.getValue({ x: 0, y: 1 })).toBe(20);
  });

  it("should throw exception on get value when location is wrong", () => {
    //given
    const rowLength = 5;
    const columnLength = 5;
    const testMatrix = new TestMatrix(rowLength, columnLength);

    //when
    testMatrix.insertRow([]);

    //then
    expect(() => testMatrix.setValue({ x: 6, y: -6 }, 5)).toThrow(
      IndexOutOfRangeException
    );
  });

  it("should throw RowOutOfRangeException", () => {
    //given
    const rowLength = 1;
    const columnLength = 5;
    const testMatrix = new TestMatrix(rowLength, columnLength);

    //when
    testMatrix.insertRow([]);

    //then
    expect(() => testMatrix.insertRow([])).toThrow(RowOutOfRangeException);
  });
});
