import genDiff from '../src/index.js';
import expectedPlain from '../__fixtures__/expected-plain.js';

test('genDiff plain json', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(expectedPlain);
});

test('genDiff plain yaml', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toBe(expectedPlain);
});

test('genDiff plain yml', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toBe(expectedPlain);
});
