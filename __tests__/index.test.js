import genDiff from '../src/index.js';
import expectedPlain from '../__fixtures__/expected-plain.js';

test('genDiff plain json', () => {
  expect(genDiff('file1plane.json', 'file2plane.json')).toBe(expectedPlain);
});

test('genDiff plain yaml', () => {
  expect(genDiff('file1plane.yaml', 'file2plane.yaml')).toBe(expectedPlain);
});

test('genDiff plain yml', () => {
  expect(genDiff('file1plane.yml', 'file2plane.yml')).toBe(expectedPlain);
});
