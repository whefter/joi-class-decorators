import * as API from 'joi-class-decorators';

describe('API', () => {
  it('should not have any unexpected exports', async () => {
    expect(Object.keys(API).sort()).toEqual(
      [
        'DEFAULT',
        // This is a type
        // 'JoiValidationGroup',
        'getTypeSchema',
        'getClassSchema',
        'JoiSchema',
        'JoiSchemaExtends',
        'JoiSchemaOptions',
        'JoiSchemaCustomization',
      ].sort(),
    );
  });

  it('should export the DEFAULT validation group symbol', async () => {
    expect(API.DEFAULT).toBeDefined();
    expect(typeof API.DEFAULT).toBe('symbol');
  });

  it('should export a getClassSchema function', async () => {
    expect(typeof API.getClassSchema).toBe('function');
  });

  it('should export a getTypeSchema function', async () => {
    expect(typeof API.getTypeSchema).toBe('function');
  });

  it('should export a JoiSchema decorator', async () => {
    expect(typeof API.JoiSchema).toBe('function');
  });

  it('should export a JoiSchemaExtends decorator', async () => {
    expect(typeof API.JoiSchemaExtends).toBe('function');
  });

  it('should export a JoiSchemaOptions decorator', async () => {
    expect(typeof API.JoiSchemaOptions).toBe('function');
  });

  it('should export a JoiSchemaCustomization decorator', async () => {
    expect(typeof API.JoiSchemaCustomization).toBe('function');
  });
});
