## `joi-class-decorators`

<a href="https://www.npmjs.com/package/joi-class-decorators" target="_blank"><img src="https://img.shields.io/npm/v/joi-class-decorators.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/joi-class-decorators" target="_blank"><img src="https://img.shields.io/npm/l/joi-class-decorators.svg" alt="Package License" /></a>
[![Coverage Status](https://coveralls.io/repos/github/whefter/joi-class-decorators/badge.svg)](https://coveralls.io/github/whefter/joi-class-decorators)
![test](https://github.com/whefter/joi-class-decorators/workflows/test/badge.svg)
![publish](https://github.com/whefter/joi-class-decorators/workflows/publish/badge.svg)

Integrate your Joi validation schema definitions directly into your type/DTO classes with convenient decorators.

- [Installation](#installation)
  - [Peer dependencies](#peer-dependencies)
- [Usage](#usage)
- [Reference](#reference)
  - [Validation groups](#validation-groups)
    - [Built-in group: `DEFAULT`](#built-in-group-default)
  - [`getClassSchema(typeClass, opts?: { group? })` (alias: `getTypeSchema()`)](#getclassschematypeclass-opts--group--alias-gettypeschema)
  - [`@JoiSchema()` property decorator](#joischema-property-decorator)
    - [`@JoiSchema(joiSchema)`](#joischemajoischema)
    - [`@JoiSchema(groups[], joiSchema)`](#joischemagroups-joischema)
    - [`@JoiSchema(nestedType, customizeSchemaCallback?)`](#joischemanestedtype-customizeschemacallback)
    - [`@JoiSchema(groups[], nestedType, customizeSchemaCallback?)`](#joischemagroups-nestedtype-customizeschemacallback)
    - [`@JoiSchema([nestedType], customizeArraySchemaCallback?, customizeSchemaCallback?)`](#joischemanestedtype-customizearrayschemacallback-customizeschemacallback)
    - [`@JoiSchema(groups[], [nestedType], customizeArraySchemaCallback?, customizeSchemaCallback?)`](#joischemagroups-nestedtype-customizearrayschemacallback-customizeschemacallback)
  - [`@JoiSchemaOptions()` class decorator](#joischemaoptions-class-decorator)
    - [`@JoiSchemaOptions(Joi.Options)`](#joischemaoptionsjoioptions)
    - [`@JoiSchemaOptions(groups[], Joi.options)`](#joischemaoptionsgroups-joioptions)
  - [`@JoiSchemaExtends(type)` class decorator](#joischemaextendstype-class-decorator)
  - [`@JoiSchemaCustomization()` class decorator](#joischemacustomization-class-decorator)
    - [`@JoiSchemaCustomization(customizeSchemaCallback)`](#joischemacustomizationcustomizeschemacallback)
    - [`@JoiSchemaCustomization(groups[], customizeSchemaCallback)`](#joischemacustomizationgroups-customizeschemacallback)
  - [Class inheritance](#class-inheritance)

# Installation

```bash
npm install --save joi-class-decorators
```

## Peer dependencies

This library supports Joi 17 and 18.

```bash
npm install --save joi@^17 reflect-metadata@^0.1
# or
npm install --save joi@^18 reflect-metadata@^0.1
```

Support matrix:

| joi-class-decorators | Supported joi versions |
| --- | --- |
| 1.x | 17.x, 18.x |

# Usage

Annotate your type/DTO classes with property and options decorators, then obtain the computed schema for use in validation.

```typescript
import { JoiSchema, JoiSchemaOptions, getClassSchema } from 'joi-class-decorators';
import * as Joi from 'joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class BookDto {
  @JoiSchema(Joi.string().required())
  @JoiSchema(['CREATE'], Joi.string().required())
  @JoiSchema(['UPDATE'], Joi.string().optional())
  name!: string;

  @JoiSchema(Joi.string().required())
  @JoiSchema(['CREATE'], Joi.string().required())
  @JoiSchema(['UPDATE'], Joi.string().optional())
  author!: string;

  @JoiSchema(Joi.number().optional())
  publicationYear?: number;
}

const schema = getClassSchema(BookDto);
Joi.assert(
  {
    name: 'Interesting Times',
    author: 'Terry Pratchett',
    publicationYear: 1994,
  },
  schema,
);

const updateSchema = getClassSchema(BookDto, { group: 'UPDATE' });
Joi.assert(
  {
    name: 'Interesting Times',
  },
  updateSchema,
);
```

# Reference

## Validation groups

Groups can be used to annotate a property (`@JoiSchema`) or class (`@JoiSchemaOptions`) with different schemas/options for different use cases without having to define a new type.

A straightforward use case for this is a type/DTO that behaves slightly differently when creating or updating a ressource. Have a look at the example in the [Usage](#usage) section.

### Built-in group: `DEFAULT`

The `DEFAULT` symbol is the default "group" assigned under the hood to any schema defined on a property, or any options defined on a class, if a group is not explicitely specified.

In the following example, both declarations have the same effect:

```typescript
import { DEFAULT } from 'joi-class-decorators';

@JoiSchemaOptions({
  allowUnknown: false,
})
class ImplicitDefaultGroupDto {
  @JoiSchema(Joi.string().required())
  name!: string;
}

@JoiSchemaOptions([DEFAULT], {
  allowUnknown: false,
})
class ExplicitDefaultGroupDto {
  @JoiSchema([DEFAULT], Joi.string().required())
  name!: string;
}
```

## `getClassSchema(typeClass, opts?: { group? })` (alias: `getTypeSchema()`)

This function can be called to obtain the `Joi` schema constructed from `typeClass`. Nothing is cached.

A group can be passed to construct the schema for a specific group (together with the groups specified in `@JoiSchema()` etc.).

This function makes possible advanced uses such as the following:

```typescript
class ThrillerDto {
  @JoiSchema(Joi.number().required())
  thrill!: number;
}

class RomanceDto {
  @JoiSchema(Joi.number().optional())
  romance?: number;
}

class AuthorDto {
  @JoiSchema(Joi.alternatives(getTypeSchema(ThrillerDto), getTypeSchema(RomanceDto)))
  booksRatings: ThrillerDto | RomanceDto;
}
```

## `@JoiSchema()` property decorator

Define a schema on a type (class) property. Properties with a schema annotation are used to construct a full object schema.

**Example**

```typescript
class BookDto {
  @JoiSchema(Joi.string().required())
  name!: string;

  @JoiSchema(Joi.string().required())
  author!: string;

  @JoiSchema(Joi.number().optional())
  publicationYear?: number;
}
```

Will construct the following equivalent `Joi` schema:

```typescript
Joi.object().keys({
  name: Joi.string().required(),
  author: Joi.string().required(),
  publicationYear: Joi.number.optional(),
});
```

### `@JoiSchema(joiSchema)`

Assign the passed Joi schema to the decorated property for the `DEFAULT` group.

**Example**

```typescript
class BookDto {
  @JoiSchema(Joi.string().optional())
  name?: string;
}
```

### `@JoiSchema(groups[], joiSchema)`

Assign the passed Joi schema to the decorated property for the passed groups.

**Example**

```typescript
class BookDto {
  @JoiSchema(['CREATE'], Joi.string().required())
  name!: string;
}
```

### `@JoiSchema(nestedType, customizeSchemaCallback?)`

Assign the full schema constructed from the passed `nestedType` to the decorated property, for the `DEFAULT` group.

The nested schema is constructed using the same method as other schemas, e.g. non-decorated properties are not used in constructing the schema.

If the optional `customizeSchemaCallback` is provided, it will be called with the constructed schema to allow customization, e.g. `.options()`, `.required()` and so on.

**Example**

```typescript
class AuthorDto {
  @JoiSchema(BookDto, schema => schema.required())
  firstBook!: BookDto;
}
```

### `@JoiSchema(groups[], nestedType, customizeSchemaCallback?)`

Assign the full schema constructed from the passed `nestedType` to the decorated property, for the passed groups.

**Example**

```typescript
class AuthorDto {
  @JoiSchema(['UPDATE'], BookDto, schema => schema.optional())
  firstBook?: BookDto;
}
```

### `@JoiSchema([nestedType], customizeArraySchemaCallback?, customizeSchemaCallback?)`

Assign a `Joi.array()`, with the full schema constructed from the passed `nestedType` as `.item()`, to the decorated property, for the `DEFAULT` group.

The nested schema is constructed using the same method as other schemas, e.g. non-decorated properties are not used in constructing the schema.

If `customizeArraySchemaCallback` is provided, it will be called with the constructed _outer_ schema - the `.array()` schema - to allow customization, e.g. `.options()`, `.required()` and so on.

If `customizeSchemaCallback` is provided, it will be called with the constructed _inner_ schema - the one passed to `.item()` - to allow customization, e.g. `.options()`, `.required()` and so on.

**Example**

```typescript
class AuthorDto {
  @JoiSchema([BookDto], arraySchema => arraySchema.required(), schema => schema.optional())
  books!: BookDto[];
}
```

**Note** that this is mainly a convenience type, as it is equivalent to:

```typescript
class AuthorDto {
  @JoiSchema(BookDto, schema => Joi.array().items(schema.optional()).required())
  books!: BookDto[];
}
```

### `@JoiSchema(groups[], [nestedType], customizeArraySchemaCallback?, customizeSchemaCallback?)`

Assign a `Joi.array()`, with the full schema constructed from the passed `nestedType` as `.item()`, to the decorated property, for the passed groups.

**Example**

```typescript
class AuthorDto {
  @JoiSchema(
    ['UPDATE'],
    [BookDto],
    arraySchema => arraySchema.optional().default([]),
    schema => schema.optional(),
  )
  books!: BookDto[];
}
```

## `@JoiSchemaOptions()` class decorator

Assign the passed Joi _options_ to be passed to `.options()` on the full constructed schema.

**Example**

```typescript
@JoiSchemaOptions({
  allowUnknown: false,
})
class BookDto {
  @JoiSchema(Joi.string().optional())
  name?: string;
}
```

### `@JoiSchemaOptions(Joi.Options)`

Assign the passed Joi options to the decorated class for the `DEFAULT` group.

**Example**

```typescript
@JoiSchemaOptions({
  allowUnknown: false,
})
class BookDto {
  @JoiSchema(Joi.string().optional())
  name?: string;
}
```

### `@JoiSchemaOptions(groups[], Joi.options)`

Assign the passed Joi options to the decorated class for the passed groups.

**Example**

```typescript
@JoiSchemaOptions(['CREATE'], {
  allowUnknown: false,
})
class BookDto {
  @JoiSchema(['CREATE'], Joi.string().optional())
  name?: string;
}
```

## `@JoiSchemaExtends(type)` class decorator

Specify an alternative extended class for schema construction. `type` must be a class constructor.

This decorator is useful for cases where the actual parent class in the prototype chain is not the class that has been decorated with `@JoiSchema()` etc., possibly as a result of some other transformation, as with `@nestjs/graphql`'s `OmitType()`.

The following example illustrates the behavior:

```typescript
// Given this parent class
class BookDto {
  @JoiSchema(Joi.string().required())
  name!: string;
}

// These two examples generate the same schema (containing both name and thrill keys)
// 1.
class ThrillerDto extends BookDto {
  @JoiSchema(Joi.number().optional())
  thrill?: number;
}
// 2.
@JoiSchemaExtends(BookDto)
class ThrillerDto {
  @JoiSchema(Joi.number().optional())
  thrill?: number;
}
```

For an actual use case, consider the following example for a `@nestjs/graphql` `InputType`, where `OmitType()` creates a new internal class on which it tacks on all the properties from `Book`, but without applying any decorators. Without `@JoiSchemaExtends()`, no decorated properties from `Book` would be present in the final schema:

```typescript
// Does not work as expected
@InputType()
export class CreateBookInput extends OmitType(Book, ['id'], InputType) {
  @JoiSchema(Joi.string())
  @Field()
  extraArg?: string;
}

// Works as expected
@InputType()
@JoiSchemaExtends(Book)
export class CreateBookInput extends OmitType(Book, ['id'], InputType) {
  @JoiSchema(Joi.string())
  @Field()
  extraArg?: string;
```

## `@JoiSchemaCustomization()` class decorator

This decorator takes a customization function which is called with the full and final constructed class (type) schema and uses the return value (which should be a schema) in subsequent steps.

This covers cases such as:

```typescript
@JoiSchemaCustomization(schema => schema.or('label', 'description'))
class BookDto {
  @JoiSchema(Joi.string().required())
  label!: string;

  @JoiSchema(Joi.string().required())
  description!: string;
}
```

Notes

- This theoretically allows for a complete replacement of the schema. Your customization function could simply return a new schema such as `Joi.string('hello')`, though it is unclear what the applications of this are (perhaps conditional cases, though this is covered in part by groups and Joi's built-in conditionals)
- For extending types, callbacks are called for a parent before a child type.

### `@JoiSchemaCustomization(customizeSchemaCallback)`

Assign the passed customization callback to the decorated class for the `DEFAULT` group.

**Example**: see example above

### `@JoiSchemaCustomization(groups[], customizeSchemaCallback)`

Assign the passed customization callback to the decorated class for the passed group(s).

**Example**

```typescript
@JoiSchemaCustomization(['CREATE'], schema => schema.or('label', 'description'))
class BookDto {
  @JoiSchema(Joi.string().required())
  label!: string;

  @JoiSchema(Joi.string().required())
  description!: string;
}
```

## Class inheritance

Both `@JoiSchema()` and `@JoiSchemaOptions()` work with class inheritance.

```typescript
@JoiSchemaOptions({
  allowUnknown: false,
})
class BookDto {
  @JoiSchema(Joi.string().required())
  name!: string;
}

@JoiSchemaOptions({
  allowUnknown: true,
})
class ExtendedBookDto extends BookDto {
  @JoiSchema(Joi.string().optional())
  author?: string;
}
```

Will construct the following equivalent `Joi` schema for `ExtendedBookDto`:

```typescript
Joi.object()
  .keys({
    name: Joi.string().required(),
    author: Joi.string().optional(),
  })
  .options({
    allowUnknown: true,
  });
```
