var readline = require("readline");
import { Finder } from "./Business/Finder";
import { IFinder } from "./Business/IFinder";
import { IMatrixProcessor } from "./Business/IMatrixProcessor";
import { PixelMatrixProcessor } from "./Business/PixelMatrixProcessor";
import { ResultMatrixProcessor } from "./Business/ResultMatrixProcessor";
import { ResultMatrix } from "./Models/Domains/ResultMatrix";
import { PixelColor } from "./Models/Enums/PixelColor";

const target = PixelColor.WHITE;
const commandReader = readline.createInterface(process.stdin, process.stdout);

var matrixProcessor: IMatrixProcessor<any, any> = new PixelMatrixProcessor();
var resultProcessor: IMatrixProcessor<any, any> = new ResultMatrixProcessor();
var finder: IFinder<number> = new Finder();

async function main() {
  const firstline = await readFromCommand();
  const testCases = Number.parseInt(firstline);
  const caseResults = new Array<ResultMatrix>();

  for (let caseNumber = 0; caseNumber < testCases; caseNumber++) {
    caseResults.push(await getResult());
  }

  for (const caseResult of caseResults) {
    console.log(resultProcessor.matrixToData(caseResult));
  }
}

async function getResult(): Promise<ResultMatrix> {
  const firstLine = await readFromCommand();
  const arr = firstLine.split(" ");
  const rowLength = Number.parseInt(arr[0]);
  const coloumLength = Number.parseInt(arr[1]);
  const resultMatrix = resultProcessor.createMatrix(rowLength, coloumLength);

  const matrix = matrixProcessor.createMatrix(rowLength, coloumLength);

  for (let x = 0; x < rowLength; x++) {
    const rowData = await readFromCommand();
    matrixProcessor.insertRowToMatrix(rowData, matrix);
  }

  for (let x = 0; x < rowLength; x++) {
    const rowData = new Array<number>();
    for (let y = 0; y < coloumLength; y++) {
      rowData.push(finder.findNearestDistance({ x, y }, matrix, target));
    }
    resultProcessor.insertRowToMatrix(rowData, resultMatrix);
  }
  return resultMatrix;
}

function readFromCommand(): Promise<string> {
  return new Promise((resolve) => {
    commandReader.question("", (line) => {
      resolve(line);
    });
  });
}

main();
