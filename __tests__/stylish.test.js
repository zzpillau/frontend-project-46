import path from 'path';
import fs from 'fs';
import __dirname from '../src/utils.js';
import stylish from '../src/formatters/stylish.js';
import buildASTree from '../src/buildASTree.js';
import prepareData from '../src/prepareData.js';

const setPathToFixtures = (relativePath) =>
  path.resolve(__dirname, '..', '__fixtures__', relativePath);
const getContent = (pathToContent) => fs.readFileSync(setPathToFixtures(pathToContent), 'utf-8');

const testFixture = 'expected-nested-stylish.txt';
const pathToFixture = setPathToFixtures(testFixture);
const expectedResult = getContent(pathToFixture);

const ASTree = buildASTree(prepareData('file1.json'), prepareData('file2.json'));

test('stylish should work', () => {
  expect(stylish(ASTree)).toBe(expectedResult);
});
