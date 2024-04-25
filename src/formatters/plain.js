import _ from 'lodash';

const convertValue = (value) => {
  if (_.isObject(value)) {
    return `[complex value]`;
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const buildPathToKey = (data, searchedKey, separator = '.') => {
  const sd = (someData) =>
    someData.reduce((acc, item) => {
      const { key, children } = item;
      if (key !== searchedKey) {
        const hasChildren = children.length > 0;
        if (hasChildren && !acc.includes(searchedKey)) {
          return [key, sd(children, searchedKey)].flat();
        }
      } else {
        return [key];
      }
      return acc;
    }, []);
  return sd(data).join(separator);
};

const plain = (data) => {
  const formatPlain = (ASTree) => {
    const lines = ASTree.flatMap((node) => {
      const { key, type, children, value, addedValue } = node;

      const pathToKey = buildPathToKey(data, key);

      const convertedValue = convertValue(value);

      switch (type) {
        case 'changed':
          return `Property '${pathToKey}' was updated. From ${convertedValue} to ${convertValue(addedValue)}`;
        case 'deleted':
          return `Property '${pathToKey}' was removed`;
        case 'added':
          return `Property '${pathToKey}' was added with value: ${convertedValue}`;
        case 'nested':
          return formatPlain(children);
        default:
          return [];
      }
    });
    return [...lines].join('\n');
  };
  return formatPlain(data);
};

export default plain;
