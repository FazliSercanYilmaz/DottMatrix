import { CommandProcessor } from "./Business/CommandProcessor";
import { Finder } from "./Business/Finder";
import { IFinder } from "./Business/IFinder";
import { IMatrixProcessor } from "./Business/IMatrixProcessor";
import { PixelMatrixProcessor } from "./Business/PixelMatrixProcessor";
import { ResultMatrixProcessor } from "./Business/ResultMatrixProcessor";
import { Config } from "./Common/Config";
import { app } from "./app";
import { Matrix } from "./Models/Domains/Matrix";
const config = new Config(process.env);

const matrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new PixelMatrixProcessor();

const resultMatrixProcessor: IMatrixProcessor<
  any,
  Matrix<any>
> = new ResultMatrixProcessor();

export const finder: IFinder<any> = new Finder(resultMatrixProcessor);

const commandProcessor = new CommandProcessor(
  config,
  matrixProcessor,
  resultMatrixProcessor
);

app(commandProcessor, finder).catch((e) => {
  console.error(e);
  process.kill(process.pid, "SIGINT");
});
