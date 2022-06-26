import { IConfig } from "../Models/Domains/IConfig";
import * as Joi from "joi";
import { ConfigIsWrongException } from "../Models/Exceptions/Config/ConfigIsWrongException";

export class Config implements IConfig {
  public readonly testCaseMinSize: number;
  public readonly testCaseMaxSize: number;
  public readonly matrixMaxRow: number;
  public readonly matrixMinRow: number;
  public readonly matrixMinColumn: number;
  public readonly matrixMaxColumn: number;

  constructor(env) {
    this.testCaseMinSize = env.TEST_CASE_MIN_SIZE;
    this.testCaseMaxSize = env.TEST_CASE_MAX_SIZE;

    this.matrixMaxRow = env.MATRIX_MAX_ROW;
    this.matrixMinRow = env.MATRIX_MIN_ROW;

    this.matrixMinColumn = env.MATRIX_MIN_COLUMN;
    this.matrixMaxColumn = env.MATRIX_MAX_COLUMN;

    const validationSchema = Joi.object().keys({
      testCaseMinSize: Joi.number().integer().default(1).min(1),
      testCaseMaxSize: Joi.number().integer().default(1000).min(1),
      matrixMaxRow: Joi.number().integer().default(182).min(1),
      matrixMinRow: Joi.number().integer().default(1).min(1),
      matrixMinColumn: Joi.number().integer().default(1).min(1),
      matrixMaxColumn: Joi.number().integer().default(182).min(1),
    });

    const { error, value } = validationSchema.validate(this);

    if (error) {
      throw new ConfigIsWrongException(error.message);
    }

    return value;
  }
}
