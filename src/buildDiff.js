import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const getKeys = (obj) => _.keys(obj);
  const uniqKeys = _.sortBy(_.union(getKeys(data1), getKeys(data2)));

  return uniqKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    const hasChildren = _.isObject(value1) && _.isObject(value2);

    if (hasChildren) {
      return { key, children: buildDiff(value1, value2), type: 'nested' };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, value: value2, type: 'added' };
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, value: value1, type: 'deleted' };
    }

    if (value1 !== value2) {
      return {
        key, deletedValue: value1, addedValue: value2, type: 'changed',
      };
    }
    return { key, value: value1, type: 'unchanged' };
  });
};

export default buildDiff;
