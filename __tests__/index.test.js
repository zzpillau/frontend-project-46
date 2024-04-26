import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import __dirname from '../src/utils.js';

const getFixture = (relativePath) => {
  const setPathToFixtures = path.resolve(__dirname, '..', '__fixtures__', relativePath);
  return fs.readFileSync(setPathToFixtures, 'utf-8');
};

describe.each(['stylish', 'plain', 'json'])('genDiff %s formatter', (formatter) => {
  const expected = getFixture(`result_${formatter}.txt`);
  test.each(['json', 'yaml', 'yml'])('%s format', (format) => {
    const path1 = `file1.${format}`;
    const path2 = `file2.${format}`;

    const result = genDiff(path1, path2, formatter);

    expect(result).toBe(expected);
  });
});

test('genDiff should use stylish by default', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(getFixture('result_stylish.txt'));
});

test('genDiff - unknown formatter - should throw', () => {
  expect(() => {
    genDiff('file1.yml', 'file2.yml', 'anotherFormatter');
  }).toThrow();
});
