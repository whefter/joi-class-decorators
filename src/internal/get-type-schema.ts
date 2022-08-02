import 'reflect-metadata';

import * as Joi from 'joi';
import { reverse } from 'lodash';

import {
  ClassCustomizerMetadata,
  ClassOptionsMetadata,
  Constructor,
  CUSTOMIZER_PROTO_KEY,
  DEFAULT,
  EXTENDS_PROTO_KEY,
  JoiValidationGroup,
  ObjectSchemaCustomizerFn,
  OPTIONS_PROTO_KEY,
  PropertySchemaMetadata,
  SCHEMA_PROP_KEY,
  SCHEMA_PROTO_KEY,
  SchemaCustomizerFn,
} from './defs';

/**
 * Construct a schema based on a passed type (Constructor). Metadata set using
 * the decorators for properties (schema keys) and class (schema options) is
 * read from the whole prototype chain, up to and excluding Object.
 * If a prototype along the chain parent via decorator, that prototype
 * chain will be followed instead from that point on.
 *
 * Creating a schema from a type with no decorated properties might result
 * in a schema that only allows empty objects, depending on the of
 * the allowUnknown setting.
 *
 * @param type The type (decorated class constructor) to construct a schema from
 * @param options An optional options object
 * @param options.group An optional JoiValidationGroup to use during schema construction
 */
export function getTypeSchema(
  type: Constructor,
  /* istanbul ignore next */
  { group }: { group?: JoiValidationGroup } = {},
): Joi.Schema {
  const protoChain: Array<typeof Object.prototype> = [];

  // Get all prototypes in the chain, resulting in an array with the prototype
  // that is closest to Object as the last element. For each step, check if an
  // alternative parent was specified via decorator; if so, use that parent instead.
  let currentProto = type.prototype;
  do {
    protoChain.push(currentProto);

    const extendsMeta: Constructor | undefined = Reflect.getOwnMetadata(
      EXTENDS_PROTO_KEY,
      currentProto.constructor,
    );
    if (extendsMeta) {
      currentProto = extendsMeta.prototype;
    } else {
      currentProto = Object.getPrototypeOf(currentProto);
    }
  } while (currentProto !== Object.prototype);

  let fullSchema = Joi.object().keys({});

  // Loop through all prototypes to get their property schemas, beginning with
  // the one closest to Object, so that parent property schemas get overridden
  // by child property schemas.
  // Schema options are also assigned in that order.  const props: string[] = [];
  const schemas: { [key: string]: Joi.Schema } = {};
  const options: Joi.ValidationOptions = {};
  for (const proto of reverse(protoChain)) {
    // Check for meta information on proto
    const optionsMeta: ClassOptionsMetadata | undefined = Reflect.getOwnMetadata(
      OPTIONS_PROTO_KEY,
      proto.constructor,
    );
    const customizerMeta: ClassCustomizerMetadata | undefined = Reflect.getOwnMetadata(
      CUSTOMIZER_PROTO_KEY,
      proto.constructor,
    );

    let protoOptions: Joi.ValidationOptions;
    // Decorator was used to specify options on this proto
    if (optionsMeta && group && optionsMeta.has(group)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      protoOptions = optionsMeta.get(group)!;
    } else if (optionsMeta && optionsMeta.has(DEFAULT)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      protoOptions = optionsMeta.get(DEFAULT)!;
    } else {
      protoOptions = {};
    }
    Object.assign(options, protoOptions);

    let protoSchemaFn: ObjectSchemaCustomizerFn | undefined;
    // Decorator was used to specify options on this proto
    if (customizerMeta && group && customizerMeta.has(group)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      protoSchemaFn = customizerMeta.get(group)!;
    } else if (customizerMeta && customizerMeta.has(DEFAULT)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      protoSchemaFn = customizerMeta.get(DEFAULT)!;
    }

    // Check for property information on proto
    /* istanbul ignore next */
    const protoProps: string[] = Reflect.getOwnMetadata(SCHEMA_PROTO_KEY, proto) || [];
    for (const prop of protoProps) {
      const propMeta: PropertySchemaMetadata = Reflect.getOwnMetadata(SCHEMA_PROP_KEY, proto, prop);

      // Ignore property if not part of designated validation group
      let schemaOrType: Joi.Schema | Constructor | Constructor[];
      let schemaFn: SchemaCustomizerFn | undefined;
      let schemaArrayFn: SchemaCustomizerFn | undefined | null;
      if (propMeta && group && propMeta.has(group)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ({ schemaOrType, schemaFn, schemaArrayFn } = propMeta.get(group)!);
      } else if (propMeta && propMeta.has(DEFAULT)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ({ schemaOrType, schemaFn, schemaArrayFn } = propMeta.get(DEFAULT)!);
      } else {
        continue;
      }

      if (Joi.isSchema(schemaOrType)) {
        schemas[prop] = schemaOrType as Joi.Schema;
      } else if (typeof schemaOrType === 'function') {
        schemas[prop] = getTypeSchema(schemaOrType as Constructor, {
          group,
        }) as Joi.Schema;

        if (schemaFn) {
          schemas[prop] = schemaFn(schemas[prop]);
        }
      } else {
        /* istanbul ignore else */ // else case prevented by type checking on decorator
        if (schemaOrType instanceof Array) {
          let schema = getTypeSchema(schemaOrType[0], {
            group,
          }) as Joi.Schema;

          if (schemaFn) {
            schema = schemaFn(schema);
          }

          schemas[prop] = Joi.array().items(schema);
          if (schemaArrayFn) {
            schemas[prop] = schemaArrayFn(schemas[prop]);
          }
        }
      }
    }

    fullSchema = fullSchema.keys(schemas).options(options);
    if (protoSchemaFn) {
      fullSchema = protoSchemaFn(fullSchema);
    }
  }

  return fullSchema;
}
