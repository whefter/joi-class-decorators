import 'reflect-metadata';

import Joi = require('joi');

import { ClassOptionsMetadata, DEFAULT, JoiValidationGroup, OPTIONS_PROTO_KEY } from './defs';
import { argIsJoiValidationGroups, argIsJoiValidationOptions } from './helpers';

export function JoiSchemaOptions(options: Joi.ValidationOptions): ClassDecorator;
export function JoiSchemaOptions(
  groups: JoiValidationGroup[],
  options: Joi.ValidationOptions,
): ClassDecorator;
export function JoiSchemaOptions(...args: unknown[]): ClassDecorator {
  let options: Joi.ValidationOptions;
  let groups: JoiValidationGroup[] = [];

  if (argIsJoiValidationOptions(args[0])) {
    options = args[0];
  } else if (argIsJoiValidationGroups(args[0]) && argIsJoiValidationOptions(args[1])) {
    groups = args[0];
    options = args[1];
  } else {
    throw new Error('Invalid arguments.');
  }

  try {
    Joi.string().options(options);
  } catch (error) {
    const err = error as Error;
    err.message = `Invalid Joi.ValidationOptions: ${err.message}`;
    throw err;
  }

  return function (target: Parameters<ClassDecorator>[0]): void {
    // Get existing meta, if applicable, set options for each passed group,
    // throw if options for group already set
    const optionsMeta: ClassOptionsMetadata =
      (Reflect.getOwnMetadata(OPTIONS_PROTO_KEY, target) as ClassOptionsMetadata | undefined) ??
      (new Map() as ClassOptionsMetadata);

    const finalGroups: Array<string | symbol> = groups.length ? groups : [DEFAULT];

    for (const group of finalGroups) {
      if (optionsMeta.has(group)) {
        throw new Error(
          `Cannot redefine schema options for group ${String(group)} on ${target.constructor.name}`,
        );
      }

      optionsMeta.set(group, options);
    }

    Reflect.defineMetadata(OPTIONS_PROTO_KEY, optionsMeta, target);
  };
}
