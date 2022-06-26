import { IFinder } from "../../../Business/IFinder";
import { IMatrixProcessor } from "../../../Business/IMatrixProcessor";
import { ResultMatrixProcessor } from "../../../Business/ResultMatrixProcessor";
import { Matrix } from "../../../Models/Domains/Matrix";
import { ResultMatrix } from "../../../Models/Domains/ResultMatrix";
import { PixelColor } from "../../../Models/Enums/PixelColor";
import { Finder } from "../../../Business/Finder";
import { PixelMatrix } from "../../../Models/Domains/PixelMatrix";

describe("Finder  Test", () => {
  it("should finder create distance matrix", () => {
    //given
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

    //when
    const finder: IFinder<any> = new Finder(resultMatrixProcessor);

    //then
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

  //todo distance
});
