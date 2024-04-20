import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import __dirname from '../src/utils.js';

const setPathToFixtures = (relativePath) =>
  path.resolve(__dirname, '..', '__fixtures__', relativePath);
// console.log(setPathToFixtures('expected-plain.txt'));
const getContent = (pathToContent) => fs.readFileSync(setPathToFixtures(pathToContent), 'utf-8');
// const getFormat = (filePath) => path.extname(filePath).slice(1);

const fixture = 'expected-nested-stylish.txt';
const pathToFixture = setPathToFixtures(fixture);
const expected = getContent(pathToFixture);

test('genDiff json', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expected);
});

test('genDiff yaml', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(expected);
});

test('genDiff yml', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(expected);
});

test('formatter error', () => {
  expect(() => {
    genDiff('file1.yml', 'file2.yml', 'anotherFormatter');
  }).toThrow();
});
