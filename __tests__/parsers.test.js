import parse from '../src/parsers.js';

test('parser format error', () => {
  expect(() => {
    parse('file1.ini');
  }).toThrow();
});

// ааааа убрать юнит-тест!!!
