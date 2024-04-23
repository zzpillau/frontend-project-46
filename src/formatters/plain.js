import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return `[complex value]`;
  }
  if (_.isString(value)) {
    return value === 'null' ? `${value}` : `'${value}'`;
  }
  return value;
};

// const truePath = (data) => {

// const pathToKey = (sKey) => {
//   const reduce = data.reduce((acc, item) => {
//     const { key, children } = item;
//     if (key !== sKey) {
//       const hasChildren = children.length > 0;
//       if (hasChildren && !acc.includes(sKey)) {
//         return [key, pathToKey(children, sKey)].flat();
//       }
//     } else {
//       return key;
//     }
//     return acc;
//   }, []);
//   console.log('reduce iter', reduce);
//   return reduce;
// };

// };

// const keyLine = pathToKey(ASTree, 'wow');
// const kkk = keyLine.join('.');
// console.log(kkk);

//   return reduce;
// };
// console.log(JSON.stringify(pathToKey(ASTree, 'setting5'), null, 2));
// console.log(JSON.stringify(pathToKey(ASTree, 'baz'), null, 2));
// console.log(JSON.stringify(pathToKey(ASTree, 'nest'), null, 2));
// console.log(JSON.stringify(pathToKey(ASTree, 'group3'), null, 2));
// // console.log(JSON.stringify(pathToKey(ASTree, 'wow'), null, 2));
// console.log(pathToKey(ASTree, 'baz'));
// console.log(pathToKey(ASTree, 'wow'));
// console.log(pathToKey(ASTree, 'nest'));

// const wtf = pathToKey(ASTree, 'ops');
// console.log(wtf.join('.'));
const makePathToKey = (someData, someKey) =>
  someData.reduce((acc, item) => {
    const { key, children } = item;
    if (key !== someKey) {
      const hasChildren = children.length > 0;
      if (hasChildren && !acc.includes(someKey)) {
        return [key, makePathToKey(children, someKey)].flat();
      }
    } else {
      return [key];
    }
    return acc;
  }, []);

const plain = (data) => {
  const formatPlain = (tree) => {
    const lines = tree.flatMap((node) => {
      const { key, value, type, children } = node;

      const pathToKey = makePathToKey(data, key).join('.');

      const formattedValue = formatValue(value);

      if (children.length === 0) {
        if (type === 'changed') {
          const [valDeleted, valAdded] = value;
          return `Property '${pathToKey}' was updated. From ${formatValue(valDeleted)} to ${formatValue(valAdded)}`;
        }

        if (type === 'deleted') {
          return `Property '${pathToKey}' was removed`;
        }

        if (type === 'added') {
          return `Property '${pathToKey}' was added with value: ${formattedValue}`;
        }
        // нет детей, unchanged
        return [];
      }
      // ДЕТИ
      return formatPlain(children);
    });
    return [...lines].join('\n');
  };
  return formatPlain(data);
};

// console.log(plain(ASTree));

export default plain;
