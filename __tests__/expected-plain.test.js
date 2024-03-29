import genDiff from '../src/index.js';
import expectedPlain from '../__fixtures__/expected-plain.js';

test('genDiff plain json', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(expectedPlain);
});
