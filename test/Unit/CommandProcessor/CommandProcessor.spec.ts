import { CommandProcessor } from "../../../src/Business/CommandProcessor";
import { IConfig } from "../../../src/Models/Domains/IConfig";
import { ResultMatrixProcessor } from "../../../src/Business/ResultMatrixProcessor";
import { PixelMatrixProcessor } from "../../../src/Business/PixelMatrixProcessor";
import { Matrix } from "../../../src/Models/Domains/Matrix";
import { PixelColor } from "../../../src/Models/Enums/PixelColor";

describe("Command Processor  Test", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    process.kill;
  });
  it("should read input from console succecsfully", async () => {
    //given

    const mocketConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColom: 1,
      matrixMaxColom: 600,
    } as IConfig;

    const mockedMatrix = {
      rowLength: 0,
      columnLength: 0,
      data: [],
      getValue: ({ x, y }) => {},
      insertRow: (rowData) => {},
    };

    const matrixProcessor = new PixelMatrixProcessor();

    jest
      .spyOn(matrixProcessor, "createMatrix")
      .mockImplementation((row: any, col: any) => {
        mockedMatrix.rowLength = row;
        mockedMatrix.columnLength = col;

        return mockedMatrix as any as Matrix<PixelColor>;
      });

    jest
      .spyOn(matrixProcessor, "insertRowToMatrix")
      .mockImplementation((line, matrix: any) => {
        matrix.data.push([...line].map((value) => Number.parseInt(value)));
      });

    const resultMatrixProcessor = new ResultMatrixProcessor();

    let lineNumber = 0;
    const input = ["50", "3 4", "0001", "0011", "0110"];

    const lineReader = async () => {
      return input[lineNumber++];
    };

    //when
    const commandProcessor = new CommandProcessor(
      mocketConfig,
      matrixProcessor,
      resultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //then
    expect(await commandProcessor.getData()).toMatchObject({
      testCase: 50,

      inputMatrix: {
        data: [
          [0, 0, 0, 1],
          [0, 0, 1, 1],
          [0, 1, 1, 0],
        ],
      },
    });
  });

  it("should throw Exception when Test case isn't number ", async () => {
    //given

    const mocketConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColom: 1,
      matrixMaxColom: 600,
    } as IConfig;

    const mockedMatrix = {
      rowLength: 0,
      columnLength: 0,
      data: [],
      getValue: ({ x, y }) => {},
      insertRow: (rowData) => {},
    };

    const mockedMatrixProcessor = {} as PixelMatrixProcessor;
    const mockedResultMatrixProcessor = {} as ResultMatrixProcessor;

    let lineNumber = 0;
    const input = ["A", "3 4", "0001", "0011", "0110"];

    const lineReader = async () => {
      return input[lineNumber++];
    };

    //when
    const commandProcessor = new CommandProcessor(
      mocketConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    let error = null;
    try {
      await commandProcessor.getData();
    } catch (e) {
      error = e;
    }
    //then
    expect(error).toBeDefined();
    expect(error.message).toBe("Input is wrong");
  });

  it("should throw Exception when Test case isn't in range", async () => {
    //given

    const mocketConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColom: 1,
      matrixMaxColom: 600,
    } as IConfig;

    const mockedMatrix = {
      rowLength: 0,
      columnLength: 0,
      data: [],
      getValue: ({ x, y }) => {},
      insertRow: (rowData) => {},
    };

    const mockedMatrixProcessor = {} as PixelMatrixProcessor;
    const mockedResultMatrixProcessor = {} as ResultMatrixProcessor;

    let lineNumber = 0;
    const input = ["1000", "3 4", "0001", "0011", "0110"];

    const lineReader = async () => {
      return input[lineNumber++];
    };

    //when
    const commandProcessor = new CommandProcessor(
      mocketConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //then
    let error = null;
    try {
      await commandProcessor.getData();
    } catch (e) {
      error = e;
    }
    //then
    expect(error).toBeDefined();
    expect(error.message).toBe("Input is wrong");
  });

  it("should throw Exception when matrix row is wrong", async () => {
    //given

    const mocketConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColom: 1,
      matrixMaxColom: 600,
    } as IConfig;

    const mockedMatrix = {
      rowLength: 0,
      columnLength: 0,
      data: [],
      getValue: ({ x, y }) => {},
      insertRow: (rowData) => {},
    };

    const mockedMatrixProcessor = {} as PixelMatrixProcessor;
    const mockedResultMatrixProcessor = {} as ResultMatrixProcessor;

    let lineNumber = 0;
    const input = ["1", "AA 5", "0001", "0011", "0110"];

    const lineReader = async () => {
      return input[lineNumber++];
    };

    //when
    const commandProcessor = new CommandProcessor(
      mocketConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //then
    let error = null;
    try {
      await commandProcessor.getData();
    } catch (e) {
      error = e;
    }
    //then
    expect(error).toBeDefined();
    expect(error.message).toBe("Input is wrong");
  });

  it("should throw Exception when matrix row isn't in range", async () => {
    //given

    const mocketConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColom: 1,
      matrixMaxColom: 600,
    } as IConfig;

    const mockedMatrixProcessor = {} as PixelMatrixProcessor;
    const mockedResultMatrixProcessor = {} as ResultMatrixProcessor;

    let lineNumber = 0;
    const input = ["1", "400 20", "0001", "0011", "0110"];

    const lineReader = async () => {
      return input[lineNumber++];
    };

    //when
    const commandProcessor = new CommandProcessor(
      mocketConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //then
    let error = null;
    try {
      await commandProcessor.getData();
    } catch (e) {
      error = e;
    }
    //then
    expect(error).toBeDefined();
    expect(error.message).toBe("Input is wrong");
  });

  it("should saveData ", async () => {
    //given

    const mocketConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColom: 1,
      matrixMaxColom: 600,
    } as IConfig;

    const mockedResult = {
      testCase: 1,

      inputMatrix: {
        rowLength: 3,
        columnLength: 4,
        data: [
          [0, 0, 0, 1],
          [0, 0, 1, 1],
          [0, 1, 1, 0],
        ],
      },

      resultMatrix: {
        rowLength: 3,
        columnLength: 4,
        data: [
          [3, 2, 1, 0],
          [2, 1, 0, 0],
          [1, 0, 0, 1],
        ],
      },
    };

    const mockedMatrixProcessor = {
      matrixToData: (matrix: Matrix<PixelColor>) => {},
    } as PixelMatrixProcessor;

    const mockedResultMatrixProcessor = {
      matrixToData: (matrix: Matrix<number>) => {},
    } as ResultMatrixProcessor;

    jest
      .spyOn(mockedMatrixProcessor, "matrixToData")
      .mockImplementation((matrix) => {
        return JSON.stringify((matrix as any).data);
      });

    jest
      .spyOn(mockedResultMatrixProcessor, "matrixToData")
      .mockImplementation((matrix) => {
        //@ts-ignore
        return JSON.stringify((matrix as any).data);
      });

    let lineNumber = 0;
    const input = ["50", "3 4", "0001", "0011", "0110"];

    let outputResult = "";
    const lineReader = async () => {
      return input[lineNumber++];
    };

    const outputReader = async (...args) => {
      if (args?.length) {
        args.forEach((value) => {
          outputResult += value;
        });
      }
      outputResult += "\n";
    };

    //when
    const commandProcessor = new CommandProcessor(
      mocketConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //stout
    const saveData = jest
      .spyOn(console, "log")
      .mockImplementation(outputReader);

    await commandProcessor.saveData(mockedResult as any);
    //then
    expect(outputResult).toBe(
      "1\n3 4\n[[0,0,0,1],[0,0,1,1],[0,1,1,0]]\n[[3,2,1,0],[2,1,0,0],[1,0,0,1]]\n"
    );
  });
});
