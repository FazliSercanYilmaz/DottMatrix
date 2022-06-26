import { Matrix } from "../Models/Domains/Matrix";
import { IMatrixProcessor } from "./IMatrixProcessor";
import { IConfig } from "../Models/Domains/IConfig";
import * as Joi from "joi";
import { InputIsWrongException } from "../Models/Exceptions/Command/InputIsWrongException";
import * as readline from "node:readline";

export class CommandProcessor {
  protected commandReader: readline.Interface;
  constructor(
    private readonly config: IConfig,
    private readonly matrixProcessor: IMatrixProcessor<any, Matrix<any>>,
    private readonly resultMatrixProcessor: IMatrixProcessor<any, Matrix<any>>
  ) {
    this.commandReader = readline.createInterface(
      process.stdin,
      process.stdout
    );
  }

  async getData(): Promise<Matrix<any>> {
    const testCase = this.validateTestCase(await this.readFromCommand());

    const matrixSize = this.validateRowColumnLength(
      await this.readFromCommand()
    );

    const matrix = this.matrixProcessor.createMatrix(
      testCase,
      matrixSize.row,
      matrixSize.col
    );

    for (let i = 0; i < matrix.rowLength; i++) {
      const line = await this.readFromCommand();
      this.matrixProcessor.insertRowToMatrix(line, matrix);
    }

    return matrix;
  }
  private validateTestCase(line: string): number {
    const { value, error } = Joi.number()
      .required()
      .integer()
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
      .integer()
      .min(this.config.matrixMinRow)
      .max(this.config.matrixMaxRow)
      .validate(rowString, { convert: true });

    if (rowError) {
      throw new InputIsWrongException(rowError.message);
    }

    const { value: col, error: colError } = Joi.number()
      .required()
      .integer()
      .min(this.config.matrixMinRow)
      .max(this.config.matrixMaxRow)
      .validate(colString, { convert: true });

    if (colError) {
      throw new InputIsWrongException(colError.message);
    }

    return { row, col };
  }

  async saveData(data: Matrix<any>) {
    console.log(data.id);
    console.log(data.rowLength, " ", data.columnLength);
    console.log(this.resultMatrixProcessor.matrixToData(data));
  }

  readFromCommand(): Promise<string> {
    return new Promise((resolve) => {
      this.commandReader.question("", (line) => {
        resolve(line);
      });
    });
  }
}
