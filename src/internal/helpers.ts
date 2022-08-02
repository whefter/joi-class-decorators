import * as Joi from 'joi';
import { isArray, isFunction, isObject } from 'lodash';

import { JoiValidationGroup, ObjectSchemaCustomizerFn } from './defs';

export function argIsJoiValidationOptions(arg: unknown): arg is Joi.ValidationOptions {
  return isObject(arg) && !isArray(arg) && !isFunction(arg);
}
export function argIsJoiValidationGroups(arg: unknown): arg is JoiValidationGroup[] {
  return isArray(arg) && !arg.some(x => !['string', 'symbol'].includes(typeof x));
}
export function argIsSchemaCustomizerFn(arg: unknown): arg is ObjectSchemaCustomizerFn {
  return typeof arg === 'function';
}
