import { CommandProcessor } from "./Business/CommandProcessor";
import { Finder } from "./Business/Finder";
import { IFinder } from "./Business/IFinder";
import { IMatrixProcessor } from "./Business/IMatrixProcessor";
import { PixelMatrixProcessor } from "./Business/PixelMatrixProcessor";
import { ResultMatrixProcessor } from "./Business/ResultMatrixProcessor";
import { Matrix } from "./Models/Domains/Matrix";
import { PixelColor } from "./Models/Enums/PixelColor";

export const matrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new PixelMatrixProcessor();

export const resultMatrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new ResultMatrixProcessor();

export const commandProcessor = new CommandProcessor(
  matrixProcessor,
  resultMatrixProcessor
);
export const finder: IFinder<any> = new Finder(resultMatrixProcessor);

export async function main() {
  const input = await commandProcessor.getData();

  const resultMatrix = finder.findDistanceMatrix(
    input.inputMatrix,
    PixelColor.WHITE
  );

  commandProcessor.saveData({ ...input, resultMatrix });
}
