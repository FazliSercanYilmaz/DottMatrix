import { IFinder } from "../../../src//Business/IFinder";
import { IMatrixProcessor } from "../../../src//Business/IMatrixProcessor";
import { ResultMatrixProcessor } from "../../../src//Business/ResultMatrixProcessor";
import { Matrix } from "../../../src/Models/Domains/Matrix";
import { ResultMatrix } from "../../../src//Models/Domains/ResultMatrix";
import { PixelColor } from "../../../src/Models/Enums/PixelColor";
import { Finder } from "../../../src/Business/Finder";
import { PixelMatrix } from "../../../src/Models/Domains/PixelMatrix";

describe("Finder  Test", () => {
  it("should Finder create distance matrix", () => {
    const mockedPixelMatrix = {
      rowLength: 3,
      columnLength: 4,
      data: [
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
      ],
      getValue: ({ x, y }) => {},
      insertRow: (rowData) => {},
    };

    const mockedResultMatrix = {
      rowLength: 3,
      columnLength: 4,
      data: [],
      getValue: ({ x, y }) => {},
      insertRow: (rowData) => {},
    };

    jest.spyOn(mockedPixelMatrix, "getValue").mockImplementation(({ x, y }) => {
      return mockedPixelMatrix.data[x][y];
    });

    const resultMatrixProcessor: IMatrixProcessor<
      any,
      Matrix<any>
    > = new ResultMatrixProcessor();

    jest
      .spyOn(resultMatrixProcessor, "createMatrix")
      .mockImplementation((row: number, col: number) => {
        return mockedResultMatrix as any as ResultMatrix;
      });

    jest
      .spyOn(resultMatrixProcessor, "insertRowToMatrix")
      .mockImplementation((rowData: number[], matrix: any) => {
        matrix.data.push(rowData);
      });

    const finder: IFinder<any> = new Finder(resultMatrixProcessor);

    expect(
      finder.findDistanceMatrix(
        mockedPixelMatrix as any as PixelMatrix,
        PixelColor.WHITE
      )
    ).toMatchObject({
      rowLength: 3,
      columnLength: 4,
      data: [
        [3, 2, 1, 0],
        [2, 1, 0, 0],
        [1, 0, 0, 1],
      ],
    });
  });
});
