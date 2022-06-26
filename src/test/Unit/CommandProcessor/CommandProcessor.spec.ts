import { CommandProcessor } from "../../../Business/CommandProcessor";
import { IConfig } from "../../../Models/Domains/IConfig";
import { ResultMatrixProcessor } from "../../../Business/ResultMatrixProcessor";
import { PixelMatrixProcessor } from "../../../Business/PixelMatrixProcessor";
import { Matrix } from "../../../Models/Domains/Matrix";
import { PixelColor } from "../../../Models/Enums/PixelColor";
import { InputIsWrongException } from "../../../Models/Exceptions/Command/InputIsWrongException";

describe("Command Processor  Test", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    process.kill;
  });
  it("should read input from console succecsfully", async () => {
    //given
    const mockedConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColumn: 1,
      matrixMaxColumn: 600,
    } as IConfig;

    const mockedMatrix = {
      id: undefined,
      rowLength: 0,
      columnLength: 0,
      data: [],
      getValue: ({ x, y }) => {},
      insertRow: (rowData) => {},
    };

    const matrixProcessor = new PixelMatrixProcessor();

    jest
      .spyOn(matrixProcessor, "createMatrix")
      .mockImplementation((id: any, row: any, col: any) => {
        mockedMatrix.id = id;
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
      mockedConfig,
      matrixProcessor,
      resultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //then
    expect(await commandProcessor.getData()).toMatchObject({
      id: 50,
      rowLength: 3,
      columnLength: 4,
      data: [
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
      ],
    });
  });

  it("should throw Exception when Test case isn't number ", async () => {
    //given

    const mockedConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColumn: 1,
      matrixMaxColumn: 600,
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
      mockedConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    expect(() => commandProcessor.getData()).rejects.toThrow(
      InputIsWrongException
    );
  });

  it("should throw Exception when Test case isn't in range", async () => {
    //given

    const mockedConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColumn: 1,
      matrixMaxColumn: 600,
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
      mockedConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //then
    expect(() => commandProcessor.getData()).rejects.toThrow(
      InputIsWrongException
    );
  });

  it("should throw Exception when matrix row is wrong", async () => {
    //given

    const mockedConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColumn: 1,
      matrixMaxColumn: 600,
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
      mockedConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    expect(() => commandProcessor.getData()).rejects.toThrow(
      InputIsWrongException
    );
  });

  it("should throw Exception when matrix row isn't in range", async () => {
    //given

    const mockedConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColumn: 1,
      matrixMaxColumn: 600,
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
      mockedConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //then
    expect(() => commandProcessor.getData()).rejects.toThrow(
      InputIsWrongException
    );
  });

  it("should throw Exception when matrix col is wrong", async () => {
    //given

    const mockedConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColumn: 1,
      matrixMaxColumn: 600,
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
    const input = ["1", "1 A", "0001", "0011", "0110"];

    const lineReader = async () => {
      return input[lineNumber++];
    };

    //when
    const commandProcessor = new CommandProcessor(
      mockedConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    expect(() => commandProcessor.getData()).rejects.toThrow(
      InputIsWrongException
    );
  });

  it("should throw Exception when matrix col isn't in range", async () => {
    //given

    const mockedConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColumn: 1,
      matrixMaxColumn: 600,
    } as IConfig;

    const mockedMatrixProcessor = {} as PixelMatrixProcessor;
    const mockedResultMatrixProcessor = {} as ResultMatrixProcessor;

    let lineNumber = 0;
    const input = ["1", "1 6000", "0001", "0011", "0110"];

    const lineReader = async () => {
      return input[lineNumber++];
    };

    //when
    const commandProcessor = new CommandProcessor(
      mockedConfig,
      mockedMatrixProcessor,
      mockedResultMatrixProcessor
    );

    //stdin
    jest
      .spyOn(commandProcessor, "readFromCommand")
      .mockImplementation(lineReader);

    //then
    expect(() => commandProcessor.getData()).rejects.toThrow(
      InputIsWrongException
    );
  });

  it("should saveData ", async () => {
    //given

    const mockedConfig = {
      testCaseMinSize: 1,
      testCaseMaxSize: 200,
      matrixMaxRow: 300,
      matrixMinRow: 1,
      matrixMinColumn: 1,
      matrixMaxColumn: 600,
    } as IConfig;

    const mockedResult = {
      id: 1,
      rowLength: 3,
      columnLength: 4,
      data: [
        [3, 2, 1, 0],
        [2, 1, 0, 0],
        [1, 0, 0, 1],
      ],
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
      mockedConfig,
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
    expect(outputResult).toBe("[[3,2,1,0],[2,1,0,0],[1,0,0,1]]\n");
  });

  it("should read data from command line", () => {
    const TestProcessor = class extends CommandProcessor {
      public reader;
      constructor(x, y, z) {
        super(x, y, z);
        this.reader = this.commandReader;
      }
    };
    const commandProcessor = new TestProcessor({} as any, {} as any, {} as any);
    const line = "1234";

    jest
      .spyOn(commandProcessor.reader, "question")
      .mockImplementation(async (str, callback: any) => {
        return callback(line);
      });

    expect(commandProcessor.readFromCommand()).resolves.toBe(line);
  });
});
