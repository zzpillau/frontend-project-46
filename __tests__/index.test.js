import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import __dirname from '../src/utils.js';

const setPathToFixtures = (relativePath) =>
  path.resolve(__dirname, '..', '__fixtures__', relativePath);
// console.log(setPathToFixtures('expected-plain.txt'));
const getContent = (pathToContent) => fs.readFileSync(setPathToFixtures(pathToContent), 'utf-8');
// const getFormat = (filePath) => path.extname(filePath).slice(1);

const expectedPlain = 'expected-nested-stylish.txt';
const pathToContent = setPathToFixtures(expectedPlain);
const content = getContent(pathToContent);

test('genDiff json', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(content);
});

test('genDiff yaml', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(content);
});

test('genDiff yml', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(content);
});

test('formatter error', () => {
  expect(() => {
    genDiff('file1.yml', 'file2.yml', 'someFormatter');
  }).toThrow();
});
