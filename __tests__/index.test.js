import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import __dirname from '../src/utils.js';

const setPathToFixtures = (relativePath) => path.resolve(__dirname, '..', '__fixtures__', relativePath);
// console.log(setPathToFixtures('expected-plain.txt'));
const getContent = (pathToContent) => fs.readFileSync(setPathToFixtures(pathToContent), 'utf-8');
// const getFormat = (filePath) => path.extname(filePath).slice(1);

const expectedPlain = 'expected-plain.txt';
const pathToContent = setPathToFixtures(expectedPlain);
const content = getContent(pathToContent);

test('genDiff plain json', () => {
  expect(genDiff('file1plain.json', 'file2plain.json')).toEqual(content);
});

test('genDiff plain yaml', () => {
  expect(genDiff('file1plain.yaml', 'file2plain.yaml')).toEqual(content);
});

test('genDiff plain yml', () => {
  expect(genDiff('file1plain.yml', 'file2plain.yml')).toEqual(content);
});
