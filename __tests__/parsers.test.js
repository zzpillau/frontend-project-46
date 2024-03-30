import parse from "../src/parsers.js";

test('parser error', () => {
  expect(parse('file1.ini')).toThrow();
});
