/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable unused-imports/no-unused-vars-ts */

import { JoiSchemaCustomization } from '../../../src';

describe('@JoiSchemaCustomization()', () => {
  describe('arguments', () => {
    it('should accept (SchemaCustomizationFn)', () => {
      let error;
      try {
        @JoiSchemaCustomization(schema => schema.required())
        class test {
          prop!: string;
        }
      } catch (error_) {
        error = error_;
      }

      expect(error).toBeUndefined();
    });

    it('should reject (INVALID SchemaCustomizationFn)', () => {
      try {
        @JoiSchemaCustomization(
          // @ts-expect-error
          'abc',
        )
        class test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect(error.message).toContain('Invalid arguments');
      }
    });

    it('should accept (groupStrings[], SchemaCustomizationFn)', () => {
      let error;
      try {
        @JoiSchemaCustomization(['group1', 'group2'], schema => schema.required())
        class test {
          prop!: string;
        }
      } catch (error_) {
        error = error_;
      }

      expect(error).toBeUndefined();
    });

    it('should accept (groupSymbols[], SchemaCustomizationFn)', () => {
      let error;
      try {
        @JoiSchemaCustomization([Symbol('group1'), Symbol('group2')], schema => schema.required())
        class test {
          prop!: string;
        }
      } catch (error_) {
        error = error_;
      }

      expect(error).toBeUndefined();
    });

    it('should reject (INVALID groups[], SchemaCustomizationFn)', () => {
      try {
        // @ts-ignore
        @JoiSchemaCustomization([['invalid']], schema => schema.required())
        class test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect(error.message).toContain('Invalid arguments');
      }
    });

    it('should reject (INVALID groups[], INVALID SchemaCustomizationFn)', () => {
      try {
        // @ts-ignore
        @JoiSchemaCustomization([['invalid']], 'abc')
        class test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect(error.message).toContain('Invalid arguments');
      }
    });

    it('should reject (groupStrings[], INVALID SchemaCustomizationFn)', () => {
      try {
        // @ts-ignore
        @JoiSchemaCustomization(
          ['group1', 'group2'],
          // @ts-ignore
          'abc',
        )
        class test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect(error.message).toContain('Invalid arguments');
      }
    });

    it('should reject (groupSymbols[], INVALID SchemaCustomizationFn)', () => {
      try {
        // @ts-ignore
        @JoiSchemaCustomization(
          [Symbol('group1'), Symbol('group2')],
          // @ts-ignore
          'abc',
        )
        class test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect(error.message).toContain('Invalid arguments');
      }
    });

    it('should throw when redefining default group customization function', () => {
      try {
        @JoiSchemaCustomization(schema => schema.required())
        @JoiSchemaCustomization(schema => schema.required())
        class test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect(error.message).toContain('Cannot redefine schema customization function');
      }
    });

    it('should throw when redefining custom group customization function', () => {
      try {
        @JoiSchemaCustomization(['group1'], schema => schema.required())
        @JoiSchemaCustomization(['group1'], schema => schema.required())
        class test {
          prop!: string;
        }
        throw new Error('should not be thrown');
      } catch (error) {
        expect(error.message).toContain('Cannot redefine schema customization function');
      }
    });

    it('should be callable twice on the same type for different groups', () => {
      let error;
      try {
        @JoiSchemaCustomization(['group1'], schema => schema.required())
        @JoiSchemaCustomization(['group2'], schema => schema.required())
        class test {
          prop!: string;
        }
      } catch (error_) {
        error = error_;
      }

      expect(error).toBeUndefined();
    });
  });
});
