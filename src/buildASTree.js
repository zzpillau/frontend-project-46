import _ from 'lodash';

const makeTreeItem = (key, type, value, children = []) => (
  {
    key,
    type,
    children,
    value,
  });

const buildASTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.union(keys1, keys2);

  const ASTree = uniqKeys.map((key) => {
    const value1 = data1[key] ?? 'null';
    const value2 = data2[key] ?? 'null';

    const hasChildren = (val1, val2) => (_.isObject(val1) && _.isObject(val2));
    if (!hasChildren(value1, value2)) {
      if (!Object.hasOwn(data1, key)) {
        // return { key, type: 'added', value: value2 };
        return makeTreeItem(key, 'added', value2);
      }
      if (!Object.hasOwn(data2, key)) {
        // return { key, type: 'deleted', value: value1 };
        return makeTreeItem(key, 'deleted', value1);
      }
      if (value1 !== value2) {
        // return { key, type: 'changed', value: [value1, value2] };
        return makeTreeItem(key, 'changed', [value1, value2]);
      }
      // return { key, type: 'unchanged', value: value1 };
      return makeTreeItem(key, 'unchanged', value1);
    }
    // return { key, type: 'nested', children: buildASTree(value1, value2) };
    return makeTreeItem(key, 'nested', value1, buildASTree(value1, value2));
  });

  return ASTree;
};

// const data1 = prepareData('file1.json');
// const data2 = prepareData('file2.json');

// console.log('buildASTree', JSON.stringify(buildASTree(data1, data2), null, 2));
// console.log(buildASTree(data1, data2));

export default buildASTree;
