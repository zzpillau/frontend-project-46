import parse from '../src/parsers.js';

test('parser error', () => {
  expect(() => {
    parse('file1plane.doc');
  }).toThrow();
});
