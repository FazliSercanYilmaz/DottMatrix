import { PixelMatrix } from "../../../src/Models/Domains/PixelMatrix";
import { PixelMatrixProcessor } from "../../../src/Business/PixelMatrixProcessor";

describe("Pixel Matrix Processor  Test", () => {
  it("should create a Pixel Matrix successfully", () => {
    // given
    const pixelMatrixProcessor = new PixelMatrixProcessor();
    const row = 5;
    const col = 5;

    const matrix = pixelMatrixProcessor.createMatrix(row, col);

    expect(matrix).toBeInstanceOf(PixelMatrix);
    expect(matrix.rowLength).toBe(row);
    expect(matrix.columnLength).toBe(col);
  });

  it("should create data from Pixel matrix successfully", () => {
    // given
    const pixelMatrixProcessor = new PixelMatrixProcessor();
    const rowData = "00010";
    const rowData2 = "10000";

    const row = 2;
    const col = 5;

    const matrix = pixelMatrixProcessor.createMatrix(row, col);
    pixelMatrixProcessor.insertRowToMatrix(rowData, matrix);
    pixelMatrixProcessor.insertRowToMatrix(rowData2, matrix);

    expect(pixelMatrixProcessor.matrixToData(matrix)).toBe("00010\n10000");
  });

  it("should insert Row To Matrix Matrix successfully", () => {
    // given
    const pixelMatrixProcessor = new PixelMatrixProcessor();
    const rowData = "0001";
    const rowData2 = "0101";

    const row = 4;
    const col = 4;

    const matrix = pixelMatrixProcessor.createMatrix(row, col);

    pixelMatrixProcessor.insertRowToMatrix(rowData, matrix);
    pixelMatrixProcessor.insertRowToMatrix(rowData2, matrix);

    expect(matrix.getValue({ x: 0, y: 0 })).toBe(Number.parseInt(rowData[0]));
    expect(matrix.getValue({ x: 0, y: 1 })).toBe(Number.parseInt(rowData[1]));
    expect(matrix.getValue({ x: 0, y: 2 })).toBe(Number.parseInt(rowData[2]));
    expect(matrix.getValue({ x: 0, y: 3 })).toBe(Number.parseInt(rowData[3]));

    expect(matrix.getValue({ x: 1, y: 0 })).toBe(Number.parseInt(rowData2[0]));
    expect(matrix.getValue({ x: 1, y: 1 })).toBe(Number.parseInt(rowData2[1]));
    expect(matrix.getValue({ x: 1, y: 2 })).toBe(Number.parseInt(rowData2[2]));
    expect(matrix.getValue({ x: 1, y: 3 })).toBe(Number.parseInt(rowData2[3]));
  });

  it("should throw Exception when Inserted row's coloum length is out of range", () => {
    // given
    const pixelMatrixProcessor = new PixelMatrixProcessor();
    const rowData = "00011";

    const row = 4;
    const col = 4;

    const matrix = pixelMatrixProcessor.createMatrix(row, col);

    //when
    //then
    expect(() =>
      pixelMatrixProcessor.insertRowToMatrix(rowData, matrix)
    ).toThrow("Colomn out of range");
  });

  it("should throw Exception when Inserted row Value not Equal to number", () => {
    // given
    const pixelMatrixProcessor = new PixelMatrixProcessor();
    const rowData = "A001";

    const row = 4;
    const col = 4;

    const matrix = pixelMatrixProcessor.createMatrix(row, col);

    // when
    //then
    expect(() =>
      pixelMatrixProcessor.insertRowToMatrix(rowData, matrix)
    ).toThrow("Value is wrong");
  });
});
