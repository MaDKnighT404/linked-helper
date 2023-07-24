import generateMessage from '../generateMessage';
import { NestedElement } from '../../types';

describe('generateMessage function', () => {
  it('should handle empty array', () => {
    const template = [] as NestedElement[];
    const values = {};
    const arrVarNames = [''];
    expect(generateMessage(template, values, arrVarNames)).toBe('');
  });

  it('should handle single static element', () => {
    const template = [
      { text: 'Hello', id: 'START-TEXT-AREA', deepLevel: 1, count: 1, status: 'start' },
      [
        { text: '', id: 'IF-TRUE-AREA', deepLevel: 1, count: 2, status: 'if' },
        { text: '', id: 'THEN-AREA', deepLevel: 1, count: 2, status: 'then' },
        { text: '', id: 'ELSE-AREA', deepLevel: 1, count: 2, status: 'else' },
        { text: '', id: 'END-TEXT-AREA', deepLevel: 1, count: 2, status: 'end' },
      ],
    ];
    const values = {};
    const arrVarNames = [''];
    expect(generateMessage(template, values, arrVarNames)).toBe('Hello   ');
  });

  it('should handle multiple static elements', () => {
    const template = [
      { text: 'Hello', id: 'START-TEXT-AREA', deepLevel: 1, count: 1, status: 'start' },
      [
        { text: '', id: 'IF-TRUE-AREA', deepLevel: 1, count: 2, status: 'if' },
        { text: '', id: 'THEN-AREA', deepLevel: 1, count: 2, status: 'then' },
        { text: '', id: 'ELSE-AREA', deepLevel: 1, count: 2, status: 'else' },
        { text: 'World', id: 'END-TEXT-AREA', deepLevel: 1, count: 2, status: 'end' },
      ],
    ];
    const values = {};
    const arrVarNames = [''];
    expect(generateMessage(template, values, arrVarNames)).toBe('Hello  World ');
  });

  it('should handle single variable', () => {
    const template = [
      { text: 'Hello {name}', id: 'START-TEXT-AREA', deepLevel: 1, count: 1, status: 'start' },
      [
        { text: 'morning', id: 'IF-TRUE-AREA', deepLevel: 1, count: 2, status: 'if' },
        { text: 'Good morning {name}', id: 'THEN-AREA', deepLevel: 1, count: 2, status: 'then' },
        { text: 'Good evening {name}', id: 'ELSE-AREA', deepLevel: 1, count: 2, status: 'else' },
        { text: 'Goodbye {name}', id: 'END-TEXT-AREA', deepLevel: 1, count: 2, status: 'end' },
      ],
    ];
    const values = { name: 'John' };
    const arrVarNames = ['name'];
    expect(generateMessage(template, values, arrVarNames)).toBe(
      'Hello John Good morning John Goodbye John '
    );
  });

  it('should handle multiple variables', () => {
    const template = [
      { text: 'Hello {name}', id: 'START-TEXT-AREA', deepLevel: 1, count: 1, status: 'start' },
      [
        { text: '', id: 'IF-TRUE-AREA', deepLevel: 1, count: 2, status: 'if' },
        { text: 'Good morning {name}', id: 'THEN-AREA', deepLevel: 1, count: 2, status: 'then' },
        { text: 'Good {time} {name}', id: 'ELSE-AREA', deepLevel: 1, count: 2, status: 'else' },
        { text: 'Goodbye {name}', id: 'END-TEXT-AREA', deepLevel: 1, count: 2, status: 'end' },
      ],
    ];
    const values = { name: 'John', time: 'evening' };
    const arrVarNames = ['name', 'time'];
    expect(generateMessage(template, values, arrVarNames)).toBe(
      'Hello John Good evening John Goodbye John '
    );
  });

  it('all variables are filled', () => {
    const template = [
      {
        text: 'Hello {firstname}! I just went through your profile and I would love to join yout network!',
        id: 'START-TEXT-AREA',
        deepLevel: 1,
        count: 1,
        status: 'start',
      },
      [
        { text: '{company}', id: 'IF-TRUE-AREA', deepLevel: 1, count: 2, status: 'if' },
        {
          text: 'I know your work at {company}',
          id: 'THEN-AREA',
          deepLevel: 1,
          count: 2,
          status: 'then',
        },
        [
          { text: '{position}', id: 'IF-TRUE-AREA', deepLevel: 1, count: 3, status: 'if' },
          { text: 'as {position}', id: 'THEN-AREA', deepLevel: 1, count: 3, status: 'then' },
          {
            text: ', but what is your role?',
            id: 'ELSE-AREA',
            deepLevel: 1,
            count: 3,
            status: 'else',
          },
          { text: ':)', id: 'END-TEXT-AREA', deepLevel: 1, count: 3, status: 'end' },
        ],
        {
          text: 'Where do you work at the moment?',
          id: 'ELSE-AREA',
          deepLevel: 1,
          count: 2,
          status: 'else',
        },
        {
          text: 'Jake Software Developer test@test.test',
          id: 'END-TEXT-AREA',
          deepLevel: 1,
          count: 2,
          status: 'end',
        },
      ],
    ];
    const values = {
      firstname: 'Bill',
      lastname: 'Gates',
      company: 'Bill & Melinda company',
      position: 'Co-chair',
    };
    const arrVarNames = ['firstname', 'lastname', 'company', 'position'];
    expect(generateMessage(template, values, arrVarNames)).toBe(
      'Hello Bill! I just went through your profile and I would love to join yout network! I know your work at Bill & Melinda company as Co-chair :) Jake Software Developer test@test.test '
    );
  });

  it('All variables are filled except for position', () => {
    const template = [
      {
        text: 'Hello {firstname}! I just went through your profile and I would love to join yout network!',
        id: 'START-TEXT-AREA',
        deepLevel: 1,
        count: 1,
        status: 'start',
      },
      [
        { text: '{company}', id: 'IF-TRUE-AREA', deepLevel: 1, count: 2, status: 'if' },
        {
          text: 'I know your work at {company}',
          id: 'THEN-AREA',
          deepLevel: 1,
          count: 2,
          status: 'then',
        },
        [
          { text: '{position}', id: 'IF-TRUE-AREA', deepLevel: 1, count: 3, status: 'if' },
          { text: 'as {position}', id: 'THEN-AREA', deepLevel: 1, count: 3, status: 'then' },
          {
            text: ', but what is your role?',
            id: 'ELSE-AREA',
            deepLevel: 1,
            count: 3,
            status: 'else',
          },
          { text: ':)', id: 'END-TEXT-AREA', deepLevel: 1, count: 3, status: 'end' },
        ],
        {
          text: 'Where do you work at the moment?',
          id: 'ELSE-AREA',
          deepLevel: 1,
          count: 2,
          status: 'else',
        },
        {
          text: 'Jake Software Developer test@test.test',
          id: 'END-TEXT-AREA',
          deepLevel: 1,
          count: 2,
          status: 'end',
        },
      ],
    ];
    const values = {
      firstname: 'Bill',
      lastname: 'Gates',
      company: 'Bill & Melinda company',
      position: '',
    };
    const arrVarNames = ['firstname', 'lastname', 'company', 'position'];
    expect(generateMessage(template, values, arrVarNames)).toBe(
      'Hello Bill! I just went through your profile and I would love to join yout network! I know your work at Bill & Melinda company , but what is your role? :) Jake Software Developer test@test.test '
    );
  });

  it('Only firstname and lastname are filled', () => {
    const template = [
      {
        text: 'Hello {firstname}! I just went through your profile and I would love to join yout network!',
        id: 'START-TEXT-AREA',
        deepLevel: 1,
        count: 1,
        status: 'start',
      },
      [
        { text: '{company}', id: 'IF-TRUE-AREA', deepLevel: 1, count: 2, status: 'if' },
        {
          text: 'I know your work at {company}',
          id: 'THEN-AREA',
          deepLevel: 1,
          count: 2,
          status: 'then',
        },
        [
          { text: '{position}', id: 'IF-TRUE-AREA', deepLevel: 1, count: 3, status: 'if' },
          { text: 'as {position}', id: 'THEN-AREA', deepLevel: 1, count: 3, status: 'then' },
          {
            text: ', but what is your role?',
            id: 'ELSE-AREA',
            deepLevel: 1,
            count: 3,
            status: 'else',
          },
          { text: ':)', id: 'END-TEXT-AREA', deepLevel: 1, count: 3, status: 'end' },
        ],
        {
          text: 'Where do you work at the moment?',
          id: 'ELSE-AREA',
          deepLevel: 1,
          count: 2,
          status: 'else',
        },
        {
          text: 'Jake Software Developer test@test.test',
          id: 'END-TEXT-AREA',
          deepLevel: 1,
          count: 2,
          status: 'end',
        },
      ],
    ];
    const values = {
      firstname: 'Bill',
      lastname: 'Gates',
      company: '',
      position: '',
    };
    const arrVarNames = ['firstname', 'lastname', 'company', 'position'];
    expect(generateMessage(template, values, arrVarNames)).toBe(
      'Hello Bill! I just went through your profile and I would love to join yout network!  Jake Software Developer test@test.test '
    );
  });
});
