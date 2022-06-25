import { IConfig } from "../Models/Domains/IConfig";
import * as Joi from "joi";
import { ConfigIsWrongException } from "../Models/Exceptions/Config/ConfigIsWrongException";

export class Config implements IConfig {
  public readonly testCaseMinSize: number;
  public readonly testCaseMaxSize: number;
  public readonly matrixMaxRow: number;
  public readonly matrixMinRow: number;
  public readonly matrixMinColom: number;
  public readonly matrixMaxColom: number;

  constructor(env: any) {
    this.testCaseMinSize = env.testCaseMinSize;
    this.testCaseMaxSize = env.testCaseMaxSize;

    this.matrixMaxRow = env.matrixMaxRow;
    this.matrixMinRow = env.matrixMinRow;

    this.matrixMinColom = env.matrixMinColom;
    this.matrixMaxColom = env.matrixMaxColom;

    const validationSchema = Joi.object().keys({
      testCaseMinSize: Joi.number().default(1),
      testCaseMaxSize: Joi.number().default(100),
      matrixMaxRow: Joi.number().default(182),
      matrixMinRow: Joi.number().default(1),
      matrixMinColom: Joi.number().default(1),
      matrixMaxColom: Joi.number().default(182),
    });

    const { error, value } = validationSchema.validate(this);

    if (error) {
      throw new ConfigIsWrongException(error.message);
    }

    return value;
  }
}
