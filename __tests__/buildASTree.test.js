import fs from 'fs';
import path from 'path';
import __dirname from '../src/utils.js';
import prepareData from '../src/prepareData.js';
import buildASTree from '../src/buildASTree.js';

const setPathToFixtures = (relativePath) => path.resolve(__dirname, '..', '__fixtures__', relativePath);
// console.log(setPathToFixtures('expected-plain.txt'));
const getContent = (pathToContent) => fs.readFileSync(setPathToFixtures(pathToContent), 'utf-8');
// const getFormat = (filePath) => path.extname(filePath).slice(1);

const expectedAST = 'exp-AST.txt';
const pathToContent = setPathToFixtures(expectedAST);
const content = getContent(pathToContent);

const data1 = prepareData('file1.json');
const data2 = prepareData('file2.json');

const expectedResult = JSON.stringify(buildASTree(data1, data2), null, 2);

test('AST json', () => {
  expect(expectedResult).toEqual(content);
});
