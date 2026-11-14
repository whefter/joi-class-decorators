import Joi = require('joi');

import { JoiValidationGroup, ObjectSchemaCustomizerFn } from './defs';

export function argIsJoiValidationOptions(arg: unknown): arg is Joi.ValidationOptions {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
}
export function argIsJoiValidationGroups(arg: unknown): arg is JoiValidationGroup[] {
  return Array.isArray(arg) && !arg.some(x => !['string', 'symbol'].includes(typeof x));
}
export function argIsSchemaCustomizerFn(arg: unknown): arg is ObjectSchemaCustomizerFn {
  return typeof arg === 'function';
}
