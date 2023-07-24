import interpolateVariables from '../interpolateVariables';

describe('interpolateVariables function', () => {
  it('should correctly replace variables in the template', () => {
    const template = 'Hello {name}, how is the {timeOfDay}?';
    const arrVarNames = ['name', 'timeOfDay'];
    const values = { name: 'John', timeOfDay: 'morning' };

    expect(interpolateVariables(template, arrVarNames, values)).toBe(
      'Hello John, how is the morning?'
    );
  });

  it('should leave non-matching variables untouched', () => {
    const template = 'Hello {name}, how is the {timeOfDay}?';
    const arrVarNames = ['name'];
    const values = { name: 'John' };

    expect(interpolateVariables(template, arrVarNames, values)).toBe(
      'Hello John, how is the {timeOfDay}?'
    );
  });

  it('should replace missing value with empty string', () => {
    const template = 'Hello {name}, how is the {timeOfDay}?';
    const arrVarNames = ['name', 'timeOfDay'];
    const values = { name: 'John' };

    expect(interpolateVariables(template, arrVarNames, values)).toBe('Hello John, how is the ?');
  });

  it('should return original template if no variables provided', () => {
    const template = 'Hello {name}, how is the {timeOfDay}?';
    const arrVarNames = [''];
    const values = {};

    expect(interpolateVariables(template, arrVarNames, values)).toBe(template);
  });
});
