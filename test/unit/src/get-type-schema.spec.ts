/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable unused-imports/no-unused-vars-ts */

import { getClassSchema, getTypeSchema } from '../../../src';
import {
  AdvancedType,
  BasicType,
  BasicTypeWithCustomization,
  BasicTypeWithNoDefaultOptions,
  BasicTypeWithOptions,
  DecoratorExtendedType,
  DecoratorExtendedTypeWithOptions,
  EmptyType,
  ExtendedType,
  ExtendedTypeWithCustomization,
  ExtendedTypeWithOptions,
  TypeWithNestedType,
  TypeWithNestedTypeAndCustomizer,
  TypeWithNestedTypeArray,
  TypeWithNestedTypeArrayAndArrayCustomizer,
  TypeWithNestedTypeArrayAndCustomizer,
} from '../../fixtures';

for (const func of [getTypeSchema, getClassSchema]) {
  describe(`${func.name} with`, () => {
    describe('EmptyType', () => {
      it('should return a schema for an empty object', async () => {
        const schema = func(EmptyType);

        expect(schema.describe()).toEqual({
          type: 'object',
          keys: {},
          preferences: {},
        });
      });
    });

    describe('BasicType', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicType);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop2'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });

      describe('with group0', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicType, { group: 'group0' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop0: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop0_group0'],
              },
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop2'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicType, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1_group1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop2_group1'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });
    });

    describe('ExtendedType', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(ExtendedType);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['extended_prop2'],
              },
              extendedProp: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['extended_extendedProp'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });

      describe('with group0', () => {
        it('should return the matching schema', async () => {
          const schema = func(ExtendedType, { group: 'group0' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop0: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop0_group0'],
              },
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['extended_prop2'],
              },
              extendedProp: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['extended_extendedProp'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(ExtendedType, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1_group1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['extended_prop2_group1'],
              },
              extendedProp: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['extended_extendedProp_group1'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });
    });

    describe('DecoratorExtendedType', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(DecoratorExtendedType);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['decorator_extended_prop2'],
              },
              extendedProp: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['decorator_extended_extendedProp'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });

      describe('with group0', () => {
        it('should return the matching schema', async () => {
          const schema = func(DecoratorExtendedType, { group: 'group0' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop0: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop0_group0'],
              },
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['decorator_extended_prop2'],
              },
              extendedProp: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['decorator_extended_extendedProp'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(DecoratorExtendedType, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basic_prop1_group1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['decorator_extended_prop2_group1'],
              },
              extendedProp: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['decorator_extended_extendedProp_group1'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });
    });

    describe('AdvancedType', () => {
      it('should return the matching schema', async () => {
        const schema = func(AdvancedType);

        expect(schema.describe()).toEqual({
          type: 'object',
          keys: {
            prop: {
              type: 'alternatives',
              matches: [
                {
                  schema: {
                    type: 'object',
                    keys: {
                      prop1: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop1'],
                      },
                      prop2: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop2'],
                      },
                    },
                    preferences: {
                      allowUnknown: false,
                    },
                  },
                },
                {
                  schema: {
                    type: 'object',
                    keys: {
                      prop1: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop1'],
                      },
                      prop2: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['extended_prop2'],
                      },
                      extendedProp: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['extended_extendedProp'],
                      },
                    },
                    preferences: {
                      allowUnknown: false,
                    },
                  },
                },
              ],
            },
          },
          preferences: {},
        });
      });
    });

    describe('TypeWithNestedType', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedType);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['nested_prop1'],
              },
              nestedProp: {
                type: 'object',
                keys: {
                  prop1: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['basic_prop1'],
                  },
                  prop2: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['basic_prop2'],
                  },
                },
                preferences: {
                  allowUnknown: false,
                },
              },
            },
            preferences: {},
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedType, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['nested_prop1_group1'],
              },
              nestedProp: {
                type: 'object',
                keys: {
                  prop1: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['basic_prop1_group1'],
                  },
                  prop2: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['extended_prop2_group1'],
                  },
                  extendedProp: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['extended_extendedProp_group1'],
                  },
                },
                preferences: {
                  allowUnknown: false,
                },
              },
            },
            preferences: {},
          });
        });
      });
    });

    describe('TypeWithNestedTypeArray', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedTypeArray);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['nested_array_prop1'],
              },
              nestedProp: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    keys: {
                      prop1: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop1'],
                      },
                      prop2: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop2'],
                      },
                    },
                    preferences: {
                      allowUnknown: false,
                    },
                  },
                ],
              },
            },
            preferences: {},
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedTypeArray, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['nested_array_prop1_group1'],
              },
              nestedProp: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    keys: {
                      prop1: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop1_group1'],
                      },
                      prop2: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['extended_prop2_group1'],
                      },
                      extendedProp: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['extended_extendedProp_group1'],
                      },
                    },
                    preferences: {
                      allowUnknown: false,
                    },
                  },
                ],
              },
            },
            preferences: {},
          });
        });
      });
    });

    describe('TypeWithNestedTypeAndCustomizer', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedTypeAndCustomizer);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              nestedProp: {
                type: 'object',
                keys: {
                  prop1: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['basic_prop1'],
                  },
                  prop2: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['basic_prop2'],
                  },
                },
                preferences: {
                  allowUnknown: false,
                },
                flags: {
                  presence: 'optional',
                },
              },
            },
            preferences: {},
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedTypeAndCustomizer, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              nestedProp: {
                type: 'object',
                keys: {
                  prop1: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['basic_prop1_group1'],
                  },
                  prop2: {
                    type: 'string',
                    flags: {
                      only: true,
                      presence: 'required',
                    },
                    allow: ['basic_prop2_group1'],
                  },
                },
                preferences: {
                  allowUnknown: false,
                },
                flags: {
                  presence: 'required',
                },
              },
            },
            preferences: {},
          });
        });
      });
    });

    describe('TypeWithNestedTypeArrayAndArrayCustomizer', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedTypeArrayAndArrayCustomizer);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              nestedProp: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    keys: {
                      prop1: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop1'],
                      },
                      prop2: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop2'],
                      },
                    },
                    preferences: {
                      allowUnknown: false,
                    },
                  },
                ],
                flags: {
                  presence: 'optional',
                },
              },
            },
            preferences: {},
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedTypeArrayAndArrayCustomizer, {
            group: 'group1',
          });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              nestedProp: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    keys: {
                      prop1: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop1_group1'],
                      },
                      prop2: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop2_group1'],
                      },
                    },
                    preferences: {
                      allowUnknown: false,
                    },
                  },
                ],
                flags: {
                  presence: 'required',
                },
              },
            },
            preferences: {},
          });
        });
      });
    });

    describe('TypeWithNestedTypeArrayAndCustomizer', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedTypeArrayAndCustomizer);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              nestedProp: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    keys: {
                      prop1: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop1'],
                      },
                      prop2: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop2'],
                      },
                    },
                    preferences: {
                      allowUnknown: false,
                    },
                    flags: {
                      presence: 'optional',
                    },
                  },
                ],
                flags: {
                  presence: 'required',
                },
              },
            },
            preferences: {},
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(TypeWithNestedTypeArrayAndCustomizer, {
            group: 'group1',
          });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              nestedProp: {
                type: 'array',
                items: [
                  {
                    type: 'object',
                    keys: {
                      prop1: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop1_group1'],
                      },
                      prop2: {
                        type: 'string',
                        flags: {
                          only: true,
                          presence: 'required',
                        },
                        allow: ['basic_prop2_group1'],
                      },
                    },
                    preferences: {
                      allowUnknown: false,
                    },
                    flags: {
                      presence: 'required',
                    },
                  },
                ],
                flags: {
                  presence: 'required',
                },
              },
            },
            preferences: {},
          });
        });
      });
    });

    describe('BasicTypeWithOptions', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicTypeWithOptions);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithoptions_prop'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicTypeWithOptions, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithoptions_prop'],
              },
            },
            preferences: {
              allowUnknown: true,
            },
          });
        });
      });
    });

    describe('ExtendedTypeWithOptions', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(ExtendedTypeWithOptions);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithoptions_prop'],
              },
            },
            preferences: {
              allowUnknown: true,
            },
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(ExtendedTypeWithOptions, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithoptions_prop'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });
    });

    describe('DecoratorExtendedTypeWithOptions', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(DecoratorExtendedTypeWithOptions);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithoptions_prop'],
              },
            },
            preferences: {
              allowUnknown: true,
            },
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(DecoratorExtendedTypeWithOptions, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithoptions_prop'],
              },
            },
            preferences: {
              allowUnknown: false,
            },
          });
        });
      });
    });

    describe('BasicTypeWithNoDefaultOptions', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicTypeWithNoDefaultOptions);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithnodefaultoptions_prop1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithnodefaultoptions_prop2'],
              },
            },
            preferences: {},
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicTypeWithNoDefaultOptions, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop1: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithnodefaultoptions_prop1_group1'],
              },
              prop2: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithnodefaultoptions_prop2_group1'],
              },
            },
            preferences: {
              abortEarly: true,
            },
          });
        });
      });
    });

    describe('BasicTypeWithCustomization', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicTypeWithCustomization);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithcustomization_prop'],
              },
            },
            metas: [
              {
                group: 'default',
              },
            ],
            preferences: {},
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(BasicTypeWithCustomization, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithcustomization_prop'],
              },
            },
            metas: [
              {
                group: 'group1',
              },
            ],
            preferences: {},
          });
        });
      });
    });

    describe('ExtendedTypeWithCustomization', () => {
      describe('with no group', () => {
        it('should return the matching schema', async () => {
          const schema = func(ExtendedTypeWithCustomization);

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithcustomization_prop'],
              },
            },
            metas: [
              {
                group: 'default',
              },
              {
                extended: true,
              },
            ],
            preferences: {},
          });
        });
      });

      describe('with group1', () => {
        it('should return the matching schema', async () => {
          const schema = func(ExtendedTypeWithCustomization, { group: 'group1' });

          expect(schema.describe()).toEqual({
            type: 'object',
            keys: {
              prop: {
                type: 'string',
                flags: {
                  only: true,
                  presence: 'required',
                },
                allow: ['basicwithcustomization_prop'],
              },
            },
            metas: [
              {
                group: 'group1',
              },
              {
                extended: true,
              },
            ],
            preferences: {},
          });
        });
      });
    });
  });
}
