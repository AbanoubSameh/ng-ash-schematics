import { BaseSchema } from '../utility/base-schema';
import { Path } from "@angular-devkit/core";

export interface schema extends BaseSchema {
  shortName: string;
  routing?: boolean;
  mock?: boolean;
  ngrx?: boolean;
  feature?: string;
  postBuildEnv?: boolean;
  baseHrefasShortName?: boolean;
}