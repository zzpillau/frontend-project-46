import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import __dirname from './utils.js';

const parseContent = (relativePath) => {
  const action = {
    setAbsPath: () => path.resolve(__dirname, '..', '__fixtures__', relativePath),
    readFile: () => fs.readFileSync(action.setAbsPath(), 'utf-8'),
    getFormat: () => path.extname(relativePath).slice(1),
  };

  return parse(action.readFile(), action.getFormat());
};

const makeTreeItem = (key, type, children, value = [], addedValue = []) => ({
  key,
  type,
  children,
  value,
  addedValue,
});

const getKeys = (obj) => _.keys(obj);

const buildDiff = (data1, data2) => {
  const uniqKeys = _.sortBy(_.union(getKeys(data1), getKeys(data2)));

  return uniqKeys.map((key) => {
    const value2 = data2[key];
    const value1 = data1[key];

    const build = {
      added: () => makeTreeItem(key, 'added', [], value2),
      deleted: () => makeTreeItem(key, 'deleted', [], value1),
      changed: () => makeTreeItem(key, 'changed', [], value1, value2),
      unchanged: () => makeTreeItem(key, 'unchanged', [], value1),
      nested: () => makeTreeItem(key, 'nested', buildDiff(value1, value2)),
    };

    const hasChildren = _.isObject(value1) && _.isObject(value2);
    if (hasChildren) {
      return build.nested();
    }
    switch (true) {
      case !Object.hasOwn(data1, key):
        return build.added();
      case !Object.hasOwn(data2, key):
        return build.deleted();
      case value1 !== value2:
        return build.changed();
      default:
        return build.unchanged();
    }
  });
};

// console.log(buildDiff(parseContent('file1.json'), parseContent('file2.json')));
console.log(JSON.stringify(buildDiff(parseContent('file1.json'), parseContent('file2.json'))));
export default buildDiff;
