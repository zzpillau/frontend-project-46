import _ from 'lodash';

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

    switch (true) {
      case hasChildren:
        return build.nested();
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

export default buildDiff;
