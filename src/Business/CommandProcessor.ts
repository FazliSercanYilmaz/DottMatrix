import { Input } from "../Models/Domains/Input";
import { Result } from "../Models/Domains/Result";
import { Matrix } from "../Models/Domains/Matrix";
import { IMatrixProcessor } from "./IMatrixProcessor";
import { IConfig } from "../Models/Domains/IConfig";
import * as Joi from "joi";
import { InputIsWrongException } from "../Models/Exceptions/Command/InputIsWrongException";
var readline = require("readline");

export class CommandProcessor {
  private commandReader = readline.createInterface(
    process.stdin,
    process.stdout
  );

  constructor(
    private readonly config: IConfig,
    private readonly matrixProcessor: IMatrixProcessor<any, Matrix<any>>,
    private readonly resultMatrixProcessor: IMatrixProcessor<any, Matrix<any>>
  ) {}

  async getData(): Promise<Input> {
    const testCase = this.validateTestCase(await this.readFromCommand());

    const matrixSize = this.validateRowColumnLength(
      await this.readFromCommand()
    );

    const matrix = this.matrixProcessor.createMatrix(
      matrixSize.row,
      matrixSize.col
    );

    for (let i = 0; i < matrix.rowLength; i++) {
      const line = await this.readFromCommand();
      this.matrixProcessor.insertRowToMatrix(line, matrix);
    }

    return { inputMatrix: matrix, testCase: testCase };
  }
  private validateTestCase(line: string): number {
    const { value, error } = Joi.number()
      .required()
      .min(this.config.testCaseMinSize)
      .max(this.config.testCaseMaxSize)
      .validate(line, { convert: true });

    if (error) {
      throw new InputIsWrongException(error.message);
    }

    return value;
  }

  private validateRowColumnLength(line: string): { row: number; col: number } {
    const [rowString, colString] = line.split(" ");

    const { value: row, error: rowError } = Joi.number()
      .required()
      .min(this.config.matrixMinRow)
      .max(this.config.matrixMaxRow)
      .validate(rowString, { convert: true });

    if (rowError) {
      throw new InputIsWrongException(rowError.message);
    }

    const { value: col, error: colError } = Joi.number()
      .required()
      .min(this.config.matrixMinRow)
      .max(this.config.matrixMaxRow)
      .validate(colString, { convert: true });

    if (colError) {
      throw new InputIsWrongException(colError.message);
    }

    return { row, col };
  }

  async saveData(data: Result) {
    console.log(data.testCase);
    console.log(data.inputMatrix.rowLength, " ", data.inputMatrix.columnLength);
    console.log(this.matrixProcessor.matrixToData(data.inputMatrix));
    console.log(this.resultMatrixProcessor.matrixToData(data.resultMatrix));
  }

  readFromCommand(): Promise<string> {
    return new Promise((resolve) => {
      this.commandReader.question("", (line) => {
        resolve(line);
      });
    });
  }
}
