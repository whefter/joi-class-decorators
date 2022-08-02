import 'reflect-metadata';

import {
  ClassCustomizerMetadata,
  CUSTOMIZER_PROTO_KEY,
  DEFAULT,
  JoiValidationGroup,
  ObjectSchemaCustomizerFn,
} from './defs';
import { argIsJoiValidationGroups, argIsSchemaCustomizerFn } from './helpers';

export function JoiSchemaCustomization(customizeSchemaFn: ObjectSchemaCustomizerFn): ClassDecorator;
export function JoiSchemaCustomization(
  groups: JoiValidationGroup[],
  customizeSchemaFn: ObjectSchemaCustomizerFn,
): ClassDecorator;
export function JoiSchemaCustomization(...args: unknown[]): ClassDecorator {
  let customizeSchemaFn: ObjectSchemaCustomizerFn;
  let groups: JoiValidationGroup[] = [];

  if (argIsSchemaCustomizerFn(args[0])) {
    customizeSchemaFn = args[0];
  } else if (argIsJoiValidationGroups(args[0]) && argIsSchemaCustomizerFn(args[1])) {
    groups = args[0];
    customizeSchemaFn = args[1];
  } else {
    throw new Error('Invalid arguments.');
  }

  return function (target: Parameters<ClassDecorator>[0]): void {
    // Get existing meta, if applicable, set customizer for each passed group,
    // throw if already set for group
    const optionsMeta: ClassCustomizerMetadata =
      Reflect.getOwnMetadata(CUSTOMIZER_PROTO_KEY, target) || new Map();

    const finalGroups: Array<string | symbol> = groups.length ? groups : [DEFAULT];

    for (const group of finalGroups) {
      if (optionsMeta.has(group)) {
        throw new Error(
          `Cannot redefine schema customization function for group ${String(group)} on ${
            target.constructor.name
          }`,
        );
      }

      optionsMeta.set(group, customizeSchemaFn);
    }

    Reflect.defineMetadata(CUSTOMIZER_PROTO_KEY, optionsMeta, target);
  };
}
