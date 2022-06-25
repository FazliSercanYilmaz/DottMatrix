import { CommandProcessor } from "./Business/CommandProcessor";
import { Finder } from "./Business/Finder";
import { IFinder } from "./Business/IFinder";
import { IMatrixProcessor } from "./Business/IMatrixProcessor";
import { PixelMatrixProcessor } from "./Business/PixelMatrixProcessor";
import { ResultMatrixProcessor } from "./Business/ResultMatrixProcessor";
import { Matrix } from "./Models/Domains/Matrix";
import { PixelColor } from "./Models/Enums/PixelColor";

let matrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new PixelMatrixProcessor();

let resultMatrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new ResultMatrixProcessor();

let commandProcessor = new CommandProcessor(
  matrixProcessor,
  resultMatrixProcessor
);

let finder: IFinder<any> = new Finder(resultMatrixProcessor);

async function main() {
  const input = await commandProcessor.getData();

  const resultMatrix = finder.findDistanceMatrix(
    input.inputMatrix,
    PixelColor.WHITE
  );

  commandProcessor.saveData({ ...input, resultMatrix });
}

main();
