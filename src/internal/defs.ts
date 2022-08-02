import * as Joi from 'joi';

export type JoiValidationGroup = string | symbol;

export const DEFAULT: JoiValidationGroup = Symbol('JOI_CLASSDECORATORS_DEFAULT_GROUP');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Constructor<T = any> extends Function {
  new (...args: unknown[]): T;
}

export const OPTIONS_PROTO_KEY = Symbol('JOI_CLASSDECORATORS_OPTIONS_PROTO_KEY');
export const CUSTOMIZER_PROTO_KEY = Symbol('JOI_CLASSDECORATORS_OPTIONS_PROTO_KEY');
export type ObjectSchemaCustomizerFn = (schema: Joi.ObjectSchema) => Joi.ObjectSchema;
export type ClassOptionsMetadata = Map<string | symbol, Joi.ValidationOptions>;
export type ClassCustomizerMetadata = Map<string | symbol, ObjectSchemaCustomizerFn>;

export const SCHEMA_PROTO_KEY = Symbol('JOI_CLASSDECORATORS_SCHEMA_PROTO_KEY');
export const SCHEMA_PROP_KEY = Symbol('JOI_CLASSDECORATORS_SCHEMA_PROP_KEY');
export type SchemaCustomizerFn = (schema: Joi.Schema) => Joi.Schema;
export type PropertySchemaMetadata = Map<
  string | symbol,
  {
    schemaOrType: Joi.Schema | Constructor | Constructor[];
    schemaFn?: SchemaCustomizerFn;
    schemaArrayFn?: SchemaCustomizerFn | null;
  }
>;

export const EXTENDS_PROTO_KEY = Symbol('JOI_CLASSDECORATORS_EXTENDS_PROTO_KEY');
