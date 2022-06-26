import { Matrix } from "../../Models/Domains/Matrix";
import { Result } from "../../Models/Domains/Result";
import { commandProcessor, main } from "../../main";
import { Exception } from "../../Models/Exceptions/Exception";
import { InputIsWrongException } from "src/Models/Exceptions/Command/InputIsWrongException";

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
    await main();

    //then
    expect(outputResult).toMatchObject({
      testCase: 1,

      inputMatrix: {
        data: [
          [0, 0, 0, 1],
          [0, 0, 1, 1],
          [0, 1, 1, 0],
        ],
      },

      resultMatrix: {
        data: [
          [3, 2, 1, 0],
          [2, 1, 0, 0],
          [1, 0, 0, 1],
        ],
      },
    });

    jest.restoreAllMocks();
  });

  it("should Exception when test case size Input is wrong", async () => {
    //given
    let lineNumber = 0;
    const input = ["A   ", "3 4", "0001", "0011", "0110"];
    let error: Exception = null;
    const lineReader = async () => {
      return input[lineNumber++];
    };

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //when
    await main().catch((e) => (error = e));

    //then
    expect(error).toBeDefined();
    expect(error.code).toBe(700);
    expect(error.message).toBe("Input is wrong");

    jest.restoreAllMocks();
  });

  it("should Exception when test case size Input is wrong", async () => {
    //given
    let lineNumber = 0;
    const input = ["A   ", "3 4", "0001", "0011", "0110"];
    let error: Exception = null;
    const lineReader = async () => {
      return input[lineNumber++];
    };

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //when
    await main().catch((e) => (error = e));

    //then
    expect(error).toBeDefined();
    expect(error.code).toBe(700);
    expect(error.message).toBe("Input is wrong");

    jest.restoreAllMocks();
  });
});
