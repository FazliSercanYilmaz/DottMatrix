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
      testCaseMinSize: Joi.number().integer().default(1).min(1),
      testCaseMaxSize: Joi.number().integer().default(100).min(1),
      matrixMaxRow: Joi.number().integer().default(182).min(1),
      matrixMinRow: Joi.number().integer().default(1).min(1),
      matrixMinColom: Joi.number().integer().default(1).min(1),
      matrixMaxColom: Joi.number().integer().default(182).min(1),
    });

    const { error, value } = validationSchema.validate(this);

    if (error) {
      throw new ConfigIsWrongException(error.message);
    }

    return value;
  }
}
