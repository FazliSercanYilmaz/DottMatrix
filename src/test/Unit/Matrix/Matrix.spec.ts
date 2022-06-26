import { Matrix } from "../../../Models/Domains/Matrix";

export class TestMatix extends Matrix<number> {
  constructor(rowLength: number, columnLength: number) {
    super(rowLength, columnLength);
    this.data = new Array<Array<number>>();
  }
}

describe("Matrix test", () => {
  it("should set value to matrix succecsfully", () => {
    //given
    const rowLength = 5;
    const colomnLength = 5;
    const testMatrix = new TestMatix(rowLength, colomnLength);

    //when
    testMatrix.insertRow([]);
    testMatrix.setValue({ x: 0, y: 0 }, 5);

    //then
    expect((testMatrix as any).data[0][0]).toBe(5);
  });

  it("should throw exception on set value when location is wrong", () => {
    //given
    const rowLength = 5;
    const colomnLength = 5;
    const testMatrix = new TestMatix(rowLength, colomnLength);

    //when
    testMatrix.insertRow([]);

    let error = null;
    try {
      testMatrix.setValue({ x: 6, y: -6 }, 5);
    } catch (e) {
      error = e;
    }

    //then
    expect(error).toBeDefined();
    expect(error.code).toBe(100);
    expect(error.message).toBe("Index out of range");
  });

  it("should get value from matrix succecsfully", () => {
    //given
    const rowLength = 5;
    const colomnLength = 5;
    const testMatrix = new TestMatix(rowLength, colomnLength);

    //when
    testMatrix.insertRow([]);
    (testMatrix as any).data[0][1] = 20;

    //then
    expect(testMatrix.getValue({ x: 0, y: 1 })).toBe(20);
  });

  it("should throw exception on get value when location is wrong", () => {
    //given
    const rowLength = 5;
    const colomnLength = 5;
    const testMatrix = new TestMatix(rowLength, colomnLength);

    //when
    testMatrix.insertRow([]);

    let error = null;
    try {
      expect(testMatrix.getValue({ x: 20, y: 30 })).toBe(20);
    } catch (e) {
      error = e;
    }

    //then
    expect(error).toBeDefined();
    expect(error.code).toBe(100);
    expect(error.message).toBe("Index out of range");
  });
});
