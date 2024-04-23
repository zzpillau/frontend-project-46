import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import __dirname from '../src/utils.js';

const setPathToFixtures = (relativePath) =>
  path.resolve(__dirname, '..', '__fixtures__', relativePath);
// console.log(setPathToFixtures('expected-plain.txt'));
const getContent = (pathToContent) => fs.readFileSync(setPathToFixtures(pathToContent), 'utf-8');
// const getFormat = (filePath) => path.extname(filePath).slice(1);

const fixture1 = 'expected-stylish.txt';
const pathToFixture1 = setPathToFixtures(fixture1);
const expected1 = getContent(pathToFixture1);

const fixture2 = 'expected-plain.txt';
const pathToFixture2 = setPathToFixtures(fixture2);
const expected2 = getContent(pathToFixture2);

test('genDiff json stylish', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expected1);
  expect(genDiff('file1.yaml', 'file2.yaml', 'stylish')).toEqual(expected1);
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(expected1);
});

test('genDiff json plain', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expected2);
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(expected2);
  expect(genDiff('file1.yml', 'file2.yml', 'plain')).toEqual(expected2);
});

test('formatter error', () => {
  expect(() => {
    genDiff('file1.yml', 'file2.yml', 'anotherFormatter');
  }).toThrow();
});
