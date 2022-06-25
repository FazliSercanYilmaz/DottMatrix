import { Input } from "../Models/Domains/Input";
import { Result } from "../Models/Domains/Result";
import { Matrix } from "src/Models/Domains/Matrix";
import { IMatrixProcessor } from "./IMatrixProcessor";
var readline = require("readline");

export class CommandProcessor {
  private commandReader = readline.createInterface(
    process.stdin,
    process.stdout
  );

  constructor(
    private readonly matrixProcessor: IMatrixProcessor<any, Matrix<any>>,
    private readonly resultMatrixProcessor: IMatrixProcessor<any, Matrix<any>>
  ) {}

  async getData(): Promise<Input> {
    const testCase = await this.readFromCommand();
    const arr = (await this.readFromCommand()).split(" ");

    const matrix = this.matrixProcessor.createMatrix(
      Number.parseInt(arr[0]),
      Number.parseInt(arr[1])
    );

    for (let i = 0; i < matrix.rowLength; i++) {
      const line = await this.readFromCommand();
      this.matrixProcessor.insertRowToMatrix(line, matrix);
    }

    return { inputMatrix: matrix, testCase: Number.parseInt(testCase) };
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
