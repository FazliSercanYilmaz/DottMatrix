import { CommandProcessor } from "./Business/CommandProcessor";
import { IFinder } from "./Business/IFinder";
import { PixelColor } from "./Models/Enums/PixelColor";

export async function app(
  commandProcessor: CommandProcessor,
  finder: IFinder<unknown>
) {
  const pixelMatrix = await commandProcessor.getData();

  const resultMatrix = finder.findDistanceMatrix(pixelMatrix, PixelColor.WHITE);

  commandProcessor.saveData(resultMatrix);
}
