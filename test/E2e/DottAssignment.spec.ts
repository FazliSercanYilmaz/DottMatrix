import { Matrix } from "../../src/Models/Domains/Matrix";
import { Result } from "../../src/Models/Domains/Result";
import { commandProcessor, main } from "../../src/main";

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
});
