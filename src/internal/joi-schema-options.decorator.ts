import 'reflect-metadata';

import * as Joi from 'joi';

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
    error.message = `Invalid Joi.ValidationOptions: ${error.message}`;
    throw error;
  }

  return function (target: Parameters<ClassDecorator>[0]): void {
    // Get existing meta, if applicable, set options for each passed group,
    // throw if options for group already set
    const optionsMeta: ClassOptionsMetadata =
      Reflect.getOwnMetadata(OPTIONS_PROTO_KEY, target) || new Map();

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
