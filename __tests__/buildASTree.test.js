import fs from 'fs';
import path from 'path';
import __dirname from '../src/utils.js';
import prepareData from '../src/prepareData.js';
import buildASTree from '../src/buildASTree.js';

const setPathToFixtures = (relativePath) =>
  path.resolve(__dirname, '..', '__fixtures__', relativePath);
const getContent = (pathToContent) => fs.readFileSync(setPathToFixtures(pathToContent), 'utf-8');

const testFixture = 'exp-AST.txt';
const pathToFixture = setPathToFixtures(testFixture);
const expectedResult = getContent(pathToFixture);

test.each([
  [expectedResult, 'file1.json', 'file2.json'],
  [expectedResult, 'file1.yaml', 'file2.yaml'],
  [expectedResult, 'file1.yml', 'file2.yml'],
])('buildAST', (expected, data1, data2) => {
  expect(JSON.stringify(buildASTree(prepareData(data1), prepareData(data2)), null, 2)).toBe(
    expected,
  );
});
