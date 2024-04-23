import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import __dirname from '../src/utils.js';

const getFixture = (relativePath) => {
  const setPathToFixtures = path.resolve(__dirname, '..', '__fixtures__', relativePath);
  return fs.readFileSync(setPathToFixtures, 'utf-8');
};

describe.each(['stylish', 'plain', 'json'])('genDiff %s formatter', (formatter) => {
  const expected = getFixture(`${formatter}.txt`);
  test.each(['json', 'yaml', 'yml'])('%s format', (format) => {
    const path1 = `file1.${format}`;
    const path2 = `file2.${format}`;

    const result = genDiff(path1, path2, formatter);

    expect(result).toBe(expected);
  });
});

// test('genDiff stylish', () => {
//   expect(genDiff('file1.json', 'file2.json')).toEqual(expectedStylish);
//   expect(genDiff('file1.yaml', 'file2.yaml', 'stylish')).toEqual(expectedStylish);
//   expect(genDiff('file1.yml', 'file2.yml')).toEqual(expectedStylish);
// });

// test('genDiff plain', () => {
//   expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain);
//   expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(expectedPlain);
//   expect(genDiff('file1.yml', 'file2.yml', 'plain')).toEqual(expectedPlain);
// });

// test('genDiff json', () => {
//   expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(expectedJson);
//   expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(expectedJson);
//   expect(genDiff('file1.yml', 'file2.yml', 'json')).toEqual(expectedJson);
// });

test('genDiff should use stylish by default', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(getFixture('stylish.txt'));
});

test('genDiff should throw', () => {
  expect(() => {
    genDiff('file1.yml', 'file2.yml', 'anotherFormatter');
  }).toThrow();
});
