import { ResultMatrix } from "../../../Models/Domains/ResultMatrix";
import { ResultMatrixProcessor } from "../../../Business/ResultMatrixProcessor";

describe("Result Matrix Processor Test", () => {
  it("should create a Result Matrix successfully", () => {
    // given
    const resultMatrixProcessor = new ResultMatrixProcessor();
    const row = 5;
    const col = 5;

    const matrix = resultMatrixProcessor.createMatrix(row, col);

    expect(matrix).toBeInstanceOf(ResultMatrix);
    expect(matrix.rowLength).toBe(row);
    expect(matrix.columnLength).toBe(col);
  });

  it("should create data from matrix sccessfully", () => {
    // given
    const resultMatrixProcessor = new ResultMatrixProcessor();
    const rowData = [0, 0, 3, 1, 1];
    const rowData2 = [0, 0, 3, 1, 1];

    const row = 2;
    const col = 5;

    const matrix = resultMatrixProcessor.createMatrix(row, col);
    resultMatrixProcessor.insertRowToMatrix(rowData, matrix);
    resultMatrixProcessor.insertRowToMatrix(rowData2, matrix);

    expect(resultMatrixProcessor.matrixToData(matrix)).toBe(
      "0 0 3 1 1\n0 0 3 1 1"
    );
  });

  it("should insert Row To Matrix Matrix successfully", () => {
    // given
    const resultMatrixProcessor = new ResultMatrixProcessor();
    const rowData = [0, 0, 3, 1];
    const rowData2 = [1, 2, 0, 1];

    const row = 4;
    const col = 4;

    const matrix = resultMatrixProcessor.createMatrix(row, col);

    resultMatrixProcessor.insertRowToMatrix(rowData, matrix);
    resultMatrixProcessor.insertRowToMatrix(rowData2, matrix);

    expect(matrix.getValue({ x: 0, y: 0 })).toBe(rowData[0]);
    expect(matrix.getValue({ x: 0, y: 1 })).toBe(rowData[1]);
    expect(matrix.getValue({ x: 0, y: 2 })).toBe(rowData[2]);
    expect(matrix.getValue({ x: 0, y: 3 })).toBe(rowData[3]);

    expect(matrix.getValue({ x: 1, y: 0 })).toBe(rowData2[0]);
    expect(matrix.getValue({ x: 1, y: 1 })).toBe(rowData2[1]);
    expect(matrix.getValue({ x: 1, y: 2 })).toBe(rowData2[2]);
    expect(matrix.getValue({ x: 1, y: 3 })).toBe(rowData2[3]);
  });

  it("should throw Exception when Inserted row's coloum length is out of range", () => {
    // given
    const resultMatrixProcessor = new ResultMatrixProcessor();
    const rowData = [0, 0, 3, 1, 5];

    const row = 4;
    const col = 4;

    const matrix = resultMatrixProcessor.createMatrix(row, col);

    //when
    //then
    expect(() =>
      resultMatrixProcessor.insertRowToMatrix(rowData, matrix)
    ).toThrow("Colomn out of range");
  });

  it("should throw Exception when Inserted row Value not Equal to number", () => {
    // given
    const resultMatrixProcessor = new ResultMatrixProcessor();
    const rowData = ["a", 3, 1, 5];

    const row = 4;
    const col = 4;

    const matrix = resultMatrixProcessor.createMatrix(row, col);

    // when
    //then
    expect(() =>
      resultMatrixProcessor.insertRowToMatrix(rowData as number[], matrix)
    ).toThrow("Value is wrong");
  });
});
