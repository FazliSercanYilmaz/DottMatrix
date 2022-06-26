import { ConfigIsWrongException } from "../../Models/Exceptions/Config/ConfigIsWrongException";
import { app } from "../../app";
import { IMatrixProcessor } from "../../Business/IMatrixProcessor";
import { PixelMatrixProcessor } from "../../Business/PixelMatrixProcessor";
import { Matrix } from "../../Models/Domains/Matrix";
import { ResultMatrixProcessor } from "../../Business/ResultMatrixProcessor";
import { IFinder } from "../../Business/IFinder";
import { Finder } from "../../Business/Finder";
import { CommandProcessor } from "../../Business/CommandProcessor";
import { Config } from "../../Common/Config";
import { InputIsWrongException } from "../../Models/Exceptions/Command/InputIsWrongException";
const config = new Config({});

const matrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new PixelMatrixProcessor();

const resultMatrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new ResultMatrixProcessor();

export const finder: IFinder<any> = new Finder(resultMatrixProcessor);

const commandProcessor = new CommandProcessor(
  config,
  matrixProcessor,
  resultMatrixProcessor
);

describe("Dott Assignment E2e", () => {
  it("should return Result", async () => {
    //given
    let lineNumber = 0;
    const input = ["1", "3 4", "0001", "0011", "0110"];
    let outputResult = undefined;

    const lineReader = async () => {
      return input[lineNumber++];
    };

    const outputReader = async (result) => {
      outputResult = result;
    };

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //stout
    const saveData = jest
      .spyOn(commandProcessor, "saveData")
      .mockImplementation(outputReader);

    //when
    await app(commandProcessor, finder);

    //then
    expect(outputResult).toMatchObject({
      id: 1,
      rowLength: 3,
      columnLength: 4,
      data: [
        [3, 2, 1, 0],
        [2, 1, 0, 0],
        [1, 0, 0, 1],
      ],
    });

    jest.restoreAllMocks();
  });

  it("should throw InputIsWrongException", async () => {
    //given

    let lineNumber = 0;
    const input = ["A   ", "3 4", "0001", "0011", "0110"];
    let error = null;
    const lineReader = async () => {
      return input[lineNumber++];
    };

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //when

    //then
    expect(() => app(commandProcessor, finder)).rejects.toThrow(
      InputIsWrongException
    );

    jest.restoreAllMocks();
  });

  it("should throw ConfigIsWrongException", async () => {
    //given

    //when
    //then
    expect(() => new Config({ TEST_CASE_MIN_SIZE: "aaaa" })).toThrow(
      ConfigIsWrongException
    );
  });
});
