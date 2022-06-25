import { CommandProcessor } from "./Business/CommandProcessor";
import { Finder } from "./Business/Finder";
import { IFinder } from "./Business/IFinder";
import { IMatrixProcessor } from "./Business/IMatrixProcessor";
import { PixelMatrixProcessor } from "./Business/PixelMatrixProcessor";
import { ResultMatrixProcessor } from "./Business/ResultMatrixProcessor";
import { Config } from "./Common/Config";
import { IConfig } from "./Models/Domains/IConfig";
import { Matrix } from "./Models/Domains/Matrix";
import { PixelColor } from "./Models/Enums/PixelColor";

export const config: IConfig = new Config(process.env);

export const matrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new PixelMatrixProcessor();

export const resultMatrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new ResultMatrixProcessor();

export const commandProcessor = new CommandProcessor(
  config,
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
